const createError = require("http-errors");
const { JWT } = require("jose");
const keystore = require("../keystore");
/**
 * Checks for a JWT, and if present verifies it. Extracts the user_id from the JWT and attaches it to the request for downstream controllers to use.
 * Throws an error if JWT is not present
 */
exports.auth = (req, res, next) => {
  const bearer = req.headers["authorization"].split(" ")[1];

  try {
    const verification = JWT.verify(bearer, keystore.get({ kty: "EC" }));
    req.user = { id: verification.user_id };
    next();
  } catch (error) {
    console.log(error);
    throw createError(401, "JWT is invalid");
  }
};
