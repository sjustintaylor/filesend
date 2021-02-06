const yup = require("yup");

const newSessionRequest = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

const newSessionModel = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  nonce: yup.string().required(),
});
