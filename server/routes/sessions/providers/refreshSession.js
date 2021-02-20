const asyncHandler = require("express-async-handler");
const Session = require("../model");
const createError = require("http-errors");
const { publicKey, privateKey } = require("../../../modules/jwt");
const { default: jwtVerify } = require("jose/jwt/verify");
const { v4: uuidv4 } = require("uuid");
const addToDate = require("date-fns/add");

module.exports = asyncHandler(async (req, res) => {
  if (!req.cookies.refresh)
    throw createError(401, "Refresh cookie not present");
  const { payload } = await jwtVerify(req.cookies.refresh, publicKey, {});
  const session = await Session.findSession(payload.sub);
  session.refreshToken = {
    jti: uuidv4(),
    issuedAt: new Date().toISOString(),
    expires: addToDate(new Date(), { days: process.env.REFRESH_LIFESPAN }),
  };
  session.markModified("issuedAt");
  session.markModified("expires");
  await session.save();

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
