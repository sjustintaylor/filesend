const {
  createRecord,
  updateRecord,
  deleteRecord,
  getRecords,
} = require("../../modules/database");
const createError = require("http-errors");

exports.getSession = async (email) => {
  try {
    const session = await getRecords("sessions", { email });
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
exports.updateSession = async (id, session) => {
  try {
    return await updateRecord("sessions", { _id: id }, session);
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
