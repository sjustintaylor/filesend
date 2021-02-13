const fs = require("fs");
const crypto = require("crypto");
const rawKey = fs.readFileSync("./private-key.pem", {
  encoding: "utf8",
  flag: "r",
});

exports.privateKey = crypto.createPrivateKey(rawKey);
exports.publicKey = crypto.createPublicKey(rawKey);
