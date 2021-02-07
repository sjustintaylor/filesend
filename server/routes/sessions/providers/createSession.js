const { getSession, createSession, updateSession } = require("../model");
const { newSessionRequest } = require("../schemas");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const addToDate = require("date-fns/add");

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
  // Create new record or update existing record
  if (!record) await createSession(generateSession(values.email));
  // Create a token and assemble the link
  // Email the user
  res.status(200).send({});
});

const generateSession = (email) => {
  return {
    email,
    linkToken: "",
    linkExpiry: addToDate(new Date(), { minutes: 60 }),
  };
};
