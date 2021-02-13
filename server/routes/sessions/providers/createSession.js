const { getSession, createSession, updateSession } = require("../model");
const { newSessionRequest } = require("../schemas");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const addToDate = require("date-fns/add");
const isPast = require("date-fns/isPast");
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
      throw createError(400, error.message);
    });
  // Check for existing email record
  const record = (await getSession(values.email)) || {};

  if (!record.userID) {
    record.userID = uuidv4();
    record.link = {
      jtiWhitelist: [{ jti: uuidv4(), issuedAt: new Date().toISOString() }],
    };
    await createSession({
      email: values.email,
      userID: record.userID,
      link: record.link,
    });
  } else {
    if (record.link.jtiWhitelist.some((el) => isPast(new Date(el.issuedAt)))) {
      // Wipe expired jti claims
      record.link.jtiWhitelist = [];
    }
    record.link.jtiWhitelist.push({
      jti: uuidv4(),
      issuedAt: new Date().toISOString(),
    });
    await updateSession(record._id, record);
  }
  const token = await generateSession(
    record.userID,
    record.link.jtiWhitelist[record.link.jtiWhitelist.length - 1]
  );
  // Email the user
  await email.sendMail({
    from: process.env.EMAIL_USER,
    to: values.email,
    subject: "Continue logging into Filesend",
    html: emailTemplate(`${process.env.LINK_BASE_URL}/authenticate/${token}`),
  });
  res.status(200).send("Success");
});

const generateSession = async (userID, nonce) => {
  const exp =
    addToDate(new Date(), {
      minutes: process.env.LINK_MIN_LIFESPAN,
    }).getTime() / 1000;
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "ES256" })
    .setIssuedAt()
    .setJti(nonce)
    .setSubject(userID)
    .setExpirationTime(exp)
    .sign(privateKey);
  return token;
};
