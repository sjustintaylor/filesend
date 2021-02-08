const asyncHandler = require("express-async-handler");
const createError = require("http-errors");

module.exports = asyncHandler(async (req, res) => {
  res.send({}, 200);
});
