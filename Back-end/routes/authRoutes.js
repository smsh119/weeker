const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendVerificationEmail,
} = require("../controllers/authController.js");
const {
  validateRegistrationForm,
  validateLoginForm,
} = require("../middlewares/requestValidations.js");
const authenticate = require("../middlewares/authenticate.js");

const router = express.Router();

router.post("/register", validateRegistrationForm, registerUser);
router.post("/login", validateLoginForm, loginUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", authenticate, resendVerificationEmail);
router.delete("/logout", logoutUser);

module.exports = router;
