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
    .isLength({ min: 8, max: 32 })
    .withMessage("Password must contain at least 8 characters!")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one letter and one number!"),
];

const validateLoginForm = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Wrong email or password! Please try again."),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 32 })
    .withMessage("Wrong email or password! Please try again."),
];

const validateForgotPassword = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Please provide valid email!"),
];

const validateResetPasswordForm = [
  body("token").trim().notEmpty().withMessage("Invalid or expired reset link!"),
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Please provide valid email!"),
  body("newPassword")
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 32 })
    .withMessage("Password must contain at least 8 characters!")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one letter and one number!"),
];

const validateUserSettings = [
  body("startDayIndex")
    .isInt({ min: 0, max: 6 })
    .withMessage(
      "Please provide the correct starting day for the routine [value between 0 to 6].",
    ),
  body("startHour")
    .isInt({ min: 0, max: 23 })
    .withMessage(
      "Please provide the correct starting hour for the routine [value between 0 to 23].",
    ),
];

module.exports = {
  validateRegistrationForm,
  validateLoginForm,
  validateForgotPassword,
  validateResetPasswordForm,
  validateUserSettings,
};
