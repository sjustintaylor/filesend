const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { exchangeTokenRequest } = require("../schemas");
const { getSession, updateSession } = require("../model");
const { publicKey, privateKey } = require("../../../modules/jwt");
const { default: jwtVerify } = require("jose/jwt/verify");
const { default: SignJWT } = require("jose/jwt/sign");
const { v4: uuidv4 } = require("uuid");
const addToDate = require("date-fns/add");

module.exports = asyncHandler(async (req, res) => {
  // Validate request
  const values = await exchangeTokenRequest
    .validate(req.body, {
      abortEarly: false,
    })
    .catch((error) => {
      throw createError(400, error.errors);
    });

  // Get the session record
  const session = (await getSession("email", values.email)) || {};
  if (!session.userID) {
    throw createError(401, "User not found");
  }

  // Validate the link
  const { payload } = await jwtVerify(values.token, publicKey, {
    subject: session.userID,
  });

  // Validate the JTI
  if (!session.link.jtiWhitelist.some((el) => el.jti === payload.jti)) {
    throw createError(401, "Link token invalid or expired");
  }
  // Wipe the jti whitelist
  session.link.jtiWhitelist = [];

  // Update the record
  session.refreshToken = {
    jti: uuidv4(),
    issuedAt: new Date().toISOString(),
    expires: addToDate(new Date(), { days: process.env.REFRESH_LIFESPAN }),
  };
  await updateSession(session._id, session);

  // Generate auth token
  const authToken = await new SignJWT({ type: "auth" })
    .setProtectedHeader({ alg: "ES256" })
    .setIssuedAt()
    .setSubject(session.userID)
    .setExpirationTime(
      Math.floor(
        new Date(
          addToDate(new Date(), { minutes: process.env.AUTH_LIFESPAN })
        ).getTime() / 1000
      )
    )
    .sign(privateKey);

  // Set refresh token cookie
  const refreshToken = await new SignJWT({ type: "refresh" })
    .setProtectedHeader({ alg: "ES256" })
    .setIssuedAt()
    .setJti(session.refreshToken.jti)
    .setSubject(session.userID)
    .setExpirationTime(
      Math.floor(new Date(session.refreshToken.expires).getTime() / 1000)
    )
    .sign(privateKey);

  res
    .status(200)
    .cookie("refresh", refreshToken, {
      maxAge: session.refreshToken.expires,
      secure: true,
      httpOnly: true,
      domain: process.env.LINK_BASE_URL,
      path: process.env.REFRESH_PATH,
      sameSite: true,
    })
    .json(authToken);
});
