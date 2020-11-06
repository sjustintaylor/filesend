const { readFileSync } = require("fs");
const {
  JWK: { asKey },
  JWKS,
} = require("jose");

const key = asKey(readFileSync(process.env.JWT_KEY));
const keystore = new JWKS.KeyStore(key);

module.exports = keystore;
