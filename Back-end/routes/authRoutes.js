const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController.js");
const {
  validateRegistrationForm,
  validateLoginForm,
} = require("../middlewares/requestValidations.js");

const router = express.Router();

router.post("/register", validateRegistrationForm, registerUser);
router.post("/login", validateLoginForm, loginUser);
router.delete("/logout", logoutUser);

module.exports = router;
