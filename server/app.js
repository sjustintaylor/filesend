require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { errorHandler, route404Handler } = require("./middleware/errorHandler");

const featuresRouter = require("./routes");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", featuresRouter);

// Error handling middleware
app.use(route404Handler);
app.use(errorHandler);

module.exports = app;
