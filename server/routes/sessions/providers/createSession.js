const { getSession, createSession, updateSession } = require("../model");
const { newSessionRequest, validSessionModel } = require("../schemas");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const addToDate = require("date-fns/add");
const { v4: uuidv4 } = require("uuid");
const { default: CompactSign } = require("jose/jws/compact/sign");
const key = require("../../../modules/jwt");
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
  const record = await getSession(values.email);
  console.log(record);
  // Create session
  let session;

  if (!record) {
    session = await generateSession(values.email);
    await createSession(session);
  } else {
    session = record;
    await validSessionModel.validate(record).catch(async (error) => {
      session = await generateSession(values.email);
      updateSession(session);
    });
  }
  // Email the user
  await email.sendMail({
    from: process.env.EMAIL_USER,
    to: values.email,
    subject: "Continue logging into Filesend",
    html: emailTemplate(
      `${process.env.LINK_BASE_URL}/authenticate/${session.linkToken}`
    ),
  });
  res.status(200).send();
});

const generateSession = async (email) => {
  const encoder = new TextEncoder();
  const token = await new CompactSign(encoder.encode(uuidv4()))
    .setProtectedHeader({ alg: "ES256" })
    .sign(key);
  return {
    email,
    linkToken: token,
    linkExpiry: addToDate(new Date(), { minutes: 60 }),
  };
};
