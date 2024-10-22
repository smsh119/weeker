const { body } = require("express-validator");

const validateRegistrationForm = [
  body("fullname").trim().notEmpty().withMessage("Please provide valid name!"),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Please provide valid email!"),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 32 })
    .withMessage("Please provide valid password!"),
];

module.exports = {
  validateRegistrationForm,
};
