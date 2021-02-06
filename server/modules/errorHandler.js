const errorHandler = (error, req, res, next) => {
  // Set status code
  console.error(error);
  // Sends response
  res.send(
    {
      status: error.status,
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : "",
    },
    error.status
  );
};

module.exports = errorHandler;
