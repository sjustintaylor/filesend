const { default: SignJWT } = require("jose/jwt/sign");
const { default: jwtVerify } = require("jose/jwt/verify");
const { default: generateKeyPair } = require("jose/util/generate_key_pair");
const NodeCache = require("node-cache");
const { SHA3 } = require("sha3");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const fsSync = require("fs");
const crypto = require("crypto");

// Module fields
let privateKey;
let publicKey;
let alg = "EdDSA";
const cache = new NodeCache();
const hash = new SHA3(256);

// Module methods

/**
 * Initialises the module, and loads/generates the keypair
 * @param {String} keypath the location to store the private key at
 * @param {String} algorithm  the key algorithm to use
 */
const config = async (keypath, algorithm = "EdDSA") => {
  if (!keypath) throw new Error("KEY_PATH_REQUIRED");
  alg = algorithm;
  const keyExists = fsSync.existsSync(keypath);

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
      private.export({ type: "pkcs8", format: "pem" })
    );
    publicKey = public;
    privateKey = private;
  }
  return true;
};

/**
 * Generates a JWT
 * @param {String} subject the sub claim.
 * @param {Boolean} singleUse whether or not the token can be used more than once
 * @param {Number} expiresIn the length of time in milliseconds that the token will be valid for (from the current time)
 * @param {Object} payloadClaims Any custom claims to add to the token
 * @returns the signed token
 */
const generate = async (
  subject,
  singleUse = false,
  expiresIn,
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

/**
 * Verifies a JWT
 * @param {String} token the token to verify
 * @returns the verified payload of the token
 */
const verify = async (token) => {
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
