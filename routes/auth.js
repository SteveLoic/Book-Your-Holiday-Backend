const express = require("express");
const { check } = require("express-validator");
const User = require("./../controllers/user");

const router = express.Router();

router.post(
  "/auth",
  [
    check("email", "please provides a valid email address").isEmail(),
    check("password", "Please provides a password ")
      .not()
      .notEmpty()
      .isLength({ min: 4, max: 32 }),
    check("passwordConfirmation", "Please provides a password ")
  ],
  User.auth
);

router.post(
  "/register",
  [
    check("username", "Please provides a valid user name")
      .not()
      .notEmpty()
      .isLength({ min: 4, max: 32 }),
    check("email", "Please provides a valid email address").isEmail(),
    check("password", "Please provides a password ")
      .not()
      .notEmpty()
      .isLength({ min: 4, max: 32 }),
    check("passwordConfirmation", "Please provides a password ")
      .not()
      .notEmpty()
      .isLength({ min: 4, max: 32 })
  ],
  User.register
);

module.exports = router;
