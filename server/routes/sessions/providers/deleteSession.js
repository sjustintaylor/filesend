const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { deleteSession } = require("../model");

module.exports = asyncHandler(async (req, res) => {
  await deleteSession(req.token.sub);
  res.status(204).send();
});
