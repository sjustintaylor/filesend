const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  pool: true,
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
