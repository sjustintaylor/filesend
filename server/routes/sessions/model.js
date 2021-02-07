const {
  createRecord,
  updateRecord,
  deleteRecord,
  getRecords,
} = require("../../modules/database");
const createError = require("http-errors");

exports.getSession = async (email) => {
  try {
    return await getRecords("sessions", { email });
  } catch (error) {
    console.error(error);
    throw createError(500, error.message);
  }
};
exports.createSession = async (session) => {
  try {
    return await createRecord("sessions", session);
  } catch (error) {
    console.error(error);
    throw createError(500, error.message);
  }
};
exports.updateSession = async () => {
  try {
  } catch (error) {
    console.error(error);
    throw createError(500, error.message);
  }
};
exports.deleteSession = async () => {
  try {
  } catch (error) {
    console.error(error);
    throw createError(500, error.message);
  }
};
