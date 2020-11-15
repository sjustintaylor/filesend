const rewire = require("rewire");
const tokens = rewire("./tokens");
const fs = require("fs");

// get private vars with: tokens.__get__('publicKey')
describe("Token config", () => {
  it("generates a key if none is found", () => {});
  it("loads a key from a pem file", () => {});
});

describe("Generate a token", () => {
  it("generates a valid token", () => {});
  it("correctly adds jti claim", () => {});
});

describe("Verify a token", () => {
  it("verifies a valid token", () => {});
  it("verifies a single use token", () => {});
  it("doesn't verify a single use token twice", () => {});
  it("doesn't verify an expired token", () => {});
  it("doesn't verify a token with an invalid jti claim");
});
