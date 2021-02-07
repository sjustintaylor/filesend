const {
  createRecord,
  updateRecord,
  deleteRecord,
  getRecords,
} = require("../../modules/database");
const createError = require("http-errors");

exports.getSession = async (email) => {
  try {
    const session = await getRecords("sessions", { email: email });
    if (!session) return false;
    return session[0];
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
exports.updateSession = async (session) => {
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
