const yup = require("yup");
const addToDate = require("date-fns/add");

exports.newSessionRequest = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

exports.exchangeTokenRequest = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email address is required to redeem a link"),
  token: yup.string().required("The link token is required"),
});

exports.validSessionModel = yup.object().shape({
  email: yup.string().email().required("User's email is required"),
  linkToken: yup.string().required("Link token is invalid/missing"),
  linkExpiry: yup
    .date()
    .min(addToDate(new Date(), { minutes: 10 }))
    .required("Link has expired"),
});
