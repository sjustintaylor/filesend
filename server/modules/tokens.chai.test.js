const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { assert } = require("chai");

const { default: jwtVerify } = require("jose/jwt/verify");
const rewire = require("rewire");
const tokens = rewire("./tokens");
const fs = require("fs");
const keypath = "./testkey.pem";
const testkey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIHkF/rCBJRoEvzwR2suFG028K/Uu8zWPRsrAhKBzFiAN
-----END PRIVATE KEY-----`;
const subject = 1234;
const expiresIn = 2000;

describe("Token Library Configuration", function () {
  it("handles missing parameters", async function () {
    // await expect(fails()).to.be.rejectedWith(Error);
    await expect(tokens.config()).to.be.rejectedWith("KEY_PATH_REQUIRED");
  });
  it("generates a key if one isn't provided", async function () {
    if (fs.existsSync(keypath)) {
      fs.unlinkSync(keypath);
    }
    const conf = await tokens.config(keypath);
    expect(conf).is.true;
    assert.isOk(tokens.__get__("privateKey"));
    assert.isOk(tokens.__get__("publicKey"));
    assert.isOk(fs.existsSync(keypath));
  });
  it("loads an existing key from pem file", async function () {
    if (fs.existsSync(keypath)) {
      fs.unlinkSync(keypath);
      fs.writeFileSync(keypath, testkey);
    }
    const result = await tokens.config(keypath);
    const key = tokens
      .__get__("privateKey")
      .export({ type: "pkcs8", format: "pem" });
    assert.isOk(result);
    assert.strictEqual(key.replace(/\s/g, ""), testkey.replace(/\s/g, ""));
  });
});

describe;
