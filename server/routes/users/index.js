const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const User = require("./model");
const { login, createSession } = require("./schema");
const tokens = require("../../modules/tokens");

router.post(
  "/sessions",
  asyncHandler(async (req, res) => {
    res.status(200).send("Hello");
  })
);

router.put(
  "/sessions",
  asyncHandler(async (req, res) => {
    res.status(200).send("Refresh");
  })
);
module.exports = router;
