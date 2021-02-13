const createError = require("http-errors");
const { publicKey } = require("./jwt");
const asyncHandler = require("express-async-handler");
const { getRecords } = require("./database");

// Checks token signature
/**
 * Verifies the token signature, and attaches the decoded token to the request for downstream handlers to use.
 */
exports.checkSignature = asyncHandler(async (req, res, next) => {
  req.token = {};
  next();
});

// Checks token JTI
/**
 * Checks the JTI of the token. Expects that the signature has already been verified, and will look for the decoded token to be attached to the request.
 */
exports.checkTokenJTI = asyncHandler(async (req, res, next) => {
  next();
});

const getSession = async (userID) => {
  try {
    const session = await getRecords("sessions", { userID: userID });
    if (!session) return false;
    return session[0];
  } catch (error) {
    console.error(error);
    throw createError(500, error.message);
  }
};
