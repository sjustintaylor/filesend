const yup = require("yup");

exports.newSessionRequest = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  invite: yup.string().min(10).optional(),
});
exports.exchangeTokenRequest = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email address is required to redeem a link"),
  token: yup.string().required("The link token is required"),
});
