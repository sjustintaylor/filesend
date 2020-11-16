const rewire = require("rewire");
const tokens = rewire("./tokens");
const fs = require("fs");

const keypath = "./testkey.pem";
const testkey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIHkF/rCBJRoEvzwR2suFG028K/Uu8zWPRsrAhKBzFiAN
-----END PRIVATE KEY-----`;

// get private vars with: tokens.__get__('publicKey')
describe("Token config", () => {
  it("handles missing parameters correctly", async () => {
    expect.assertions(1);
    await expect(tokens.config()).rejects.toEqual(
      new Error("KEY_PATH_REQUIRED")
    );
  });
  it("generates a key if none is found", async () => {
    if (fs.existsSync(keypath)) {
      fs.unlinkSync(keypath);
    }
    const conf = await tokens.config(keypath);
    expect(conf).toBeTruthy();
    expect(tokens.__get__("privateKey")).toBeTruthy();
    expect(tokens.__get__("publicKey")).toBeTruthy();
    expect(fs.existsSync(keypath)).toBeTruthy();
  });
  it("loads a key from a pem file", async () => {
    if (fs.existsSync(keypath)) {
      fs.unlinkSync(keypath);
      fs.writeFileSync(keypath, testkey);
    }
    const result = await tokens.config(keypath);
    const key = tokens
      .__get__("privateKey")
      .export({ type: "pkcs8", format: "pem" });
    expect(result).toBeTruthy();
    expect(key.replace(/\s/g, "")).toEqual(testkey.replace(/\s/g, ""));
  });
});

describe("Generate a token", () => {
  it("generates a valid token", async () => {});
  it("correctly adds jti claim", async () => {});
});

describe("Verify a token", () => {
  it("verifies a valid token", async () => {});
  it("verifies a single use token", async () => {});
  it("doesn't verify a single use token twice", async () => {});
  it("doesn't verify an expired token", async () => {});
  it("doesn't verify a token with an invalid jti claim", async () => {});
});
