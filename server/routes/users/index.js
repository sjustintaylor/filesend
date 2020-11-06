const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const model = require("./model");
const yup = require("yup");
const bcrypt = require("bcrypt");
const { JWT } = require("jose");
const keystore = require("../../keystore");

router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    // Basic auth, username and password, returns a JWT with {user_id, role}
    const schema = yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    });

    // Validate request and retrieve user record
    if (!(await schema.isValid(req.body)))
      throw createError(400, "Missing username or password");
    const user_record = model.getUserByUserName(req.body.username);

    // Check password
    if (!(await bcrypt.compare(req.body.password, user_record.password)))
      throw createError(401);

    // Issue a JWT
    try {
      const token = JWT.sign(
        { user_id: user_record.id },
        keystore.get({ kty: "EC" }),
        {
          issuer: process.env.JWT_ISSUER,
          expiresIn: "1 hour",
          header: {
            typ: "JWT",
          },
        }
      );
      res.status(200).json(token);
    } catch (error) {
      console.log(error);
      throw createError(500, "JWT issuing failed");
    }
  })
);
// Authenticate for file download
// router.post(
//   "/passcode",
//   asyncHandler(async () => {
//     // Takes file id and passcode, returns a file specific JWT
//   })
// );

// These are handled in the cli
// // Create a user
// router.post(
//   "/",
//   auth,
//   asyncHandler(async () => {
//     // Username and password, makes sure requesting user role is === admin
//   })
// );

// // Delete a user
// router.delete(
//   "/:user_id",
//   auth,
//   asyncHandler(async () => {
//     // Takes nothing, makes sure requesting user role is === admin
//   })
// );

// // Change password
// router.put(
//   "/:user_id",
//   auth,
//   asyncHandler(async () => {
//     // Checks to make sure that the user_id and requesting user match
//   })
// );

module.exports = router;
