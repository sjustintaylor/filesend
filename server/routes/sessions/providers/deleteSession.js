const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { getSession, updateSession } = require("../model");

module.exports = asyncHandler(async (req, res) => {
  const record = await getSession("userID", req.token.sub);
  if (record.refreshToken) delete record.refreshToken;
  await updateSession(record._id, record);
  res.status(204).send();
});
