const createError = require("http-errors");

const errorHandler = (error, req, res, next) => {
  // Set status code
  res.status(error.status || 500);
  console.error(error);
  // Sends response
  res.json({
    status: error.status,
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : "",
  });
};

const route404Handler = (req, res, next) => {
  next(createError(404));
};

module.exports = { errorHandler, route404Handler };
