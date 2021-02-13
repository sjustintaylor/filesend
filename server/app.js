require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const { errorHandler, route404Handler } = require("./modules/errorHandler");
const cookieParser = require("cookie-parser");

const service = express();
service.use(cookieParser());
service.use(helmet());
service.use(logger(process.env.LOG_LEVEL));

// Setup routing
service.use("/sessions", require("./routes/sessions"));
service.use("/docs", require("./routes/api-docs"));

// Error Handling
service.use(route404Handler);
service.use(errorHandler);

// Start the server
module.exports = service;
