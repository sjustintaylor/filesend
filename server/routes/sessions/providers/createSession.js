const Sessions = require("../model");
const { newSessionRequest } = require("../schemas");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const addToDate = require("date-fns/add");
const isFuture = require("date-fns/isFuture");
const { v4: uuidv4 } = require("uuid");
const { default: SignJWT } = require("jose/jwt/sign");
const { privateKey } = require("../../../modules/jwt");
const email = require("../../../modules/email");
const emailTemplate = require("./loginEmailTemplate");

module.exports = asyncHandler(async (req, res) => {
  // Validate request
  const values = await newSessionRequest
    .validate(req.query, {
      abortEarly: false,
    })
    .catch((error) => {
      throw createError(400, error.errors);
    });
  // Check for existing email record
  let record = await Sessions.findSession("email", values.email);

  if (!record) {
    record = new Sessions({
      userID: uuidv4(),
      email: values.email,
      magicLinkJTIWhitelist: [
        { jti: uuidv4(), issuedAt: new Date().toISOString() },
      ],
    });
    await record.save();
  } else {
    // Wipe expired claims
    record.magicLinkJTIWhitelist = record.magicLinkJTIWhitelist.filter((el) =>
      isFuture(new Date(el.issuedAt))
    );
    record.magicLinkJTIWhitelist.push({
      jti: uuidv4(),
      issuedAt: new Date().toISOString(),
    });
    await record.save();
  }
  const token = await generateSession(
    record.userID,
    record.magicLinkJTIWhitelist[record.magicLinkJTIWhitelist.length - 1].jti
  );
  // Email the user
  if (process.env.NODE_ENV === "development") {
    res.status(200).send(token);
    return;
  } else {
    await email.sendMail({
      from: process.env.EMAIL_USER,
      to: values.email,
      subject: "Continue logging into Filesend",
      html: emailTemplate(`${process.env.LINK_BASE_URL}/authenticate/${token}`),
    });
  }
  res.status(200).send("Success");
});

const generateSession = async (userID, nonce) => {
  const exp = Math.floor(
    addToDate(new Date(), {
      minutes: process.env.LINK_MIN_LIFESPAN,
    }).getTime() / 1000
  );
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "ES256" })
    .setIssuedAt()
    .setJti(nonce)
    .setSubject(userID)
    .setExpirationTime(exp)
    .sign(privateKey);
  return token;
};
