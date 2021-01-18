const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { auth } = require("../../middleware/auth");
const model = require("./model");
const { v4: uuidv4 } = require("uuid");
const { filePurge } = require("../../middleware/filePurge");
const fs = rquire("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/${process.env.FILE_PATH}`);
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}_${file.originalname}`);
  },
});
const upload = multer({ dest: "uploads/", storage });

router.get(
  "/",
  auth,
  filePurge,
  asyncHandler(async (req, res, next) => {
    // returns a list of the user's currently active files
    res.status(200).json(model.getFileRecordsByUserID(req.user.id));
  })
);
router.get(
  "/:file_id",
  filePurge,
  asyncHandler(async (req, res, next) => {
    // Downloads the file. Checks id for validity, deletes file if invalid
    const file_record = model.getFileRecordByID(req.params.file_id);
    const filePath = `${process.cwd()}/${process.env.FILE_PATH}/${
      req.params.file_id + "_" + file_record.filename
    }`;
    res
      .set("Content-Length", fs.statSync(filePath).size)
      .download(filePath, file_record.filename);
  })
);

router.get(
  "/records/:file_id",
  asyncHandler(async (req, res, next) => {
    // Returns file name, and expiry for the file.
    res.status(200).json(model.getFileRecordByID(req.params.file_id));
  })
);

router.post(
  "/",
  auth,
  upload.single("fileUpload"),
  asyncHandler(async (req, res, next) => {
    // Creates the file and returns a uuid representing the file
    const file_id = req.file.filename.split("_")[0];
    model.createFileRecord(
      req.file.originalname,
      new Date(req.body.expires).toISOString(),
      req.user.id,
      file_id,
      new Date().toISOString()
    );
    res.status(201).json({ file_id, filename: req.file.originalname });
  })
);

module.exports = router;
