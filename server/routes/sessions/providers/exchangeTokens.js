const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { getSession, updateSession } = require("../model");
const key = require("../../../modules/jwt");
const { v4: uuidv4 } = require("uuid");
const addToDate = require("date-fns/add");

module.exports = asyncHandler(async (req, res) => {
  // Validate request
  // Get the session record
  // Validate the link
  // Wipe the jti whitelist
  // Update the record
  // Issue a token set
  res.status(200).json({});
});
