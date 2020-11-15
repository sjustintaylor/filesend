const db = require("../../db");

exports.getUserByID = (user_id) => {
  const stmt = db.prepare("SELECT * FROM users WHERE user_id = ?");
  const user_record = stmt.get(user_id);
  if (!user_record) throw new Error("user not found");

  return user_record;
};

exports.getUserByUserName = (username) => {
  const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
  const user_record = stmt.get(username);
  if (!user_record) throw new Error("user not found");

  return user_record;
};
