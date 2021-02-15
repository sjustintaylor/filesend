const asyncHandler = require("express-async-handler");
const Session = require("../model");

module.exports = asyncHandler(async (req, res) => {
  const session = await Session.findSession("userID", req.token.sub);
  delete session.refreshToken;
  await session.replaceOne(session);
  res.status(204).send();
});
