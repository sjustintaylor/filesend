const yup = require("yup");

const login = yup.object().shape({
  email: yup.string().required("Email is required"),
  invite: yup.string().nullable(),
});
const createSession = yup.object().shape({
  token: yup.string().required("Authentication token is required"),
});
module.exports = { login, createSession };
