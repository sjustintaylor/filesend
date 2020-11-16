const rewire = require("rewire");
const tokens = rewire("./tokens");
const fs = require("fs");
import fs from "fs";

// const { default: jwtVerify } = require("jose/jwt/verify");
import jwtVerify from "jose/jwt/verify";
const keypath = "./testkey.pem";

const testkey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIHkF/rCBJRoEvzwR2suFG028K/Uu8zWPRsrAhKBzFiAN
-----END PRIVATE KEY-----`;
const subject = 1234;
const expiresIn = 2000;

describe.skip("Token config", () => {
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

describe.skip("Generate a token", () => {
  it("generates a proper token with default expiry time", async () => {
    await tokens.config(keypath);
    const jwt = await tokens.generate(subject, false);
    const time = Date.now();

    const { payload } = jwtVerify(jwt, tokens.__get__("publicKey"));
    expect(payload.exp).toBeGreaterThan(time);
    expect(payload.exp).toBeLessThanOrEqual(Date.now() + 5 * 60 * 1000);
    expect(payload.sub).toBe(subject);
  });
  it("generates a proper token with custom expiry time", async () => {
    await tokens.config(keypath);
    const jwt = await tokens.generate(subject, false, expiresIn);
    const time = Date.now();
    const { payload } = jwtVerify(jwt, tokens.__get__("publicKey"));

    expect(payload.exp).toBeGreaterThan(time);
    expect(payload.exp).toBeLessThanOrEqual(time + expiresIn);
  });
  it("generates a proper single use token", async () => {
    await tokens.config(keypath);
    const jwt = await tokens.generate(subject, true);
    const { payload } = jwtVerify(jwt, tokens.__get__("publicKey"));
    expect(payload.jti).toBeTruthy();
  });
  it("adds custom claims to the payload", async () => {
    await tokens.config(keypath);
    const jwt = await tokens.generate(subject, true, _, { role: "super" });

    const { payload } = jwtVerify(jwt, tokens.__get__("publicKey"));
    expect(payload.role).toBe("super");
  });
});

describe("Verify a token", () => {
  it("verifies a valid token", async () => {});
  it("verifies a single use token", async () => {});
  it("doesn't verify a single use token twice", async () => {});
  it("doesn't verify an expired token", async () => {});
  it("doesn't verify a token with an invalid jti claim", async () => {});
});
