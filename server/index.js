require("dotenv").config();
const service = require("restana")({
  errorHandler: require("./modules/errorHandler"),
});

// const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");

service.use(helmet());
service.use(logger(process.env.LOG_LEVEL));
// service.use(cookieParser());

service.use("/sessions", require("./routes/sessions"));

// Start the server
service.start(process.env.PORT || 5000).then((service) => {
  console.log(`Service started on ${process.env.PORT || 5000}`);
});
