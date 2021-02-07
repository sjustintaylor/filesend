const createError = require("http-errors");

const route404Handler = (req, res, next) => {
  next(createError(404));
};

const errorHandler = (error, req, res, next) => {
  // Set status code
  console.error(error);
  // Sends response
  res.send(
    {
      status: error.status,
      errorMessage: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : "",
    },
    error.status || 500
  );
};

module.exports = { errorHandler, route404Handler };
