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
  const session = (await getSession(payload.sub)) || {};
  if (!session.authToken) throw createError(401, "Token invalid");
  if (session.authToken.jti !== payload.jti)
    throw createError(401, "Token invalid");
  req.token = payload;
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
