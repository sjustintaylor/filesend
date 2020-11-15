const { default: SignJWT } = require("jose/jwt/sign");
const { default: jwtVerify } = require("jose/jwt/verify");
const { default: generateKeyPair } = require("jose/util/generate_key_pair");
const NodeCache = require("node-cache");
const { SHA3 } = require("sha3");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const crypto = require("crypto");

// Module fields
let privateKey;
let publicKey;
let alg = "EdDSA";
const cache = new NodeCache();
const hash = new SHA3(256);

// Module methods
const config = async (keypath = false, algorithm = "EdDSA") => {
  if (!keypath) throw new Error("KEY_PATH_REQUIRED");
  alg = algorithm;
  const keyExists = fs.existsSync(keypath);
  if (keyExists) {
    const rawPrivateKey = await fs.readFile(keypath);
    privateKey = crypto.createPrivateKey(rawPrivateKey);
    publicKey = crypto.createPublicKey(privateKey);
  } else {
    const { privateKey: private, publicKey: public } = await generateKeyPair(
      algorithm
    );
    await fs.writeFile(
      keypath,
      privateKey.export({ type: "pem", format: "pkcs8" })
    );
    publicKey = public;
    privateKey = private;
  }
  return true;
};

const generate = async (
  subject = false,
  singleUse = false,
  expiresIn = false,
  payloadClaims = {}
) => {
  if (!key) throw new Error("KEY_NOT_SET");
  if (!expiresIn) {
    // Expires in 5 minutes by default
    expiresIn = new Date() + 5 * 60 * 1000;
  }
  let jti;
  const token = new SignJWT(payloadClaims)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpiryTime(expiresIn)
    .setSubject(subject);

  if (singleUse) {
    jti = uuidv4();
    token.setJti(jti);
  }
  const jwt = await token.sign(privateKey);
  if (singleUse) {
    hash.update(jwt);
    cache.set(hash.digest("hex"), jti, expiresIn + 30 * 1000);
  }
  return jwt;
};

const verify = async (token = false) => {
  if (!token) throw new Error("TOKEN_REQUIRED");
  if (!key) throw new Error("KEY_NOT_SET");

  // Check for jti claim
  hash.update(token);
  let jti = false;
  let options = {};
  if (cache.has(hash.digest("hex"))) {
    jti = cache.take(hash.digest("hex"));
    options.jti = jti;
  }

  // Verify token
  const { payload } = await jwtVerify(token, publicKey, options);

  // Verify jti
  if (jti && payload.jti && payload.jti !== jti) {
    throw new Error("JTI_CLAIM_INVALID");
  }
  return payload;
};

module.exports = { config, generate, verify };
