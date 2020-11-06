const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const filesRouter = require("./files");

router.use("/users", usersRouter);
router.use("/files", filesRouter);

module.exports = router;
