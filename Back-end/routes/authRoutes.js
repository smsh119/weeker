const express = require("express");
const { registerUser } = require("../controllers/authController.js");
const {
  validateRegistrationForm,
} = require("../middlewares/requestValidations.js");

const router = express.Router();

router.post("/register", validateRegistrationForm, registerUser);

module.exports = router;
