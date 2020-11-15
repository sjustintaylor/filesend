const db = require("../../db");

exports.getFileRecordByID = (file_id) => {
  const stmt = db.prepare("SELECT * FROM files WHERE file_id = ?");
  const file_record = stmt.get(file_id);
  if (!file_record) throw new Error("File not found");

  return file_record;
};

exports.createFileRecord = (name, expires, user_id, file_id, created) => {
  const stmt = db.prepare(
    "INSERT INTO files (filename, file_id, created, expires, user_id) VALUES (?, ?, ?, ?, ?)"
  );
  try {
    stmt.run(name, file_id, created, expires, user_id);
  } catch (error) {
    throw new Error("error creating file record", error);
  }
};

exports.getFileRecordsByUserID = (user_id) => {
  const stmt = db.prepare("SELECT * FROM files WHERE user_id = ?");
  const file_record = stmt.all(user_id);
  if (!file_record) throw new Error("Files not found");

  return file_record;
};

exports.deleteFileRecordByID = (file_id) => {
  const stmt = db.prepare("DELETE FROM files WHERE file_id = ?");
  stmt.run(file_id);
};
