const fs = require("fs");
const crypto = require("crypto");
const rawKey = fs.readFileSync("./private-key.pem", {
  encoding: "utf8",
  flag: "r",
});

const privateKey = crypto.createPrivateKey(rawKey);
module.exports = privateKey;
