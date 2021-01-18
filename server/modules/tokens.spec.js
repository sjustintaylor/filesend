const test = require("ava");
const rewire = require("rewire");
const tokens = rewire("./tokens");
const fs = require("fs");
const { default: jwtVerify } = require("jose/jwt/verify");
const keypath = "./testkey.pem";
const testkey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIHkF/rCBJRoEvzwR2suFG028K/Uu8zWPRsrAhKBzFiAN
-----END PRIVATE KEY-----`;
const subject = 1234;
const expiresIn = 2000;

// Configure keys

// Generate token

// Verify token
