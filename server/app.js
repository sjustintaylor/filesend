require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const { errorHandler, route404Handler } = require("./modules/errorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const db = require("./modules/database");
db.connect();

const service = express();
service.use(bodyParser.json());
service.use(cookieParser());
service.use(helmet());
service.use(logger(process.env.LOG_LEVEL));

// Setup routing
service.use("/sessions", require("./routes/sessions"));
service.use("/docs", require("./routes/api-docs"));

// Error Handling
service.use(route404Handler);
service.use(errorHandler);

module.exports = service;
