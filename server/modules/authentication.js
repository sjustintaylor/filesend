const createError = require("http-errors");
const { publicKey } = require("./jwt");
const asyncHandler = require("express-async-handler");
const { getRecords } = require("./database");
const { default: jwtVerify } = require("jose/jwt/verify");

// Checks auth token signature
/**
 * Verifies the token signature, and attaches the decoded token to the request for downstream handlers to use.
 */
exports.checkToken = asyncHandler(async (req, res, next) => {
  const { payload } = await jwtVerify(
    req.headers.authorization.slice(7),
    publicKey,
    {}
  );
  req.token = payload;
  next();
});
