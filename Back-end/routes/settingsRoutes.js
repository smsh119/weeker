const express = require("express");
const {
  validateUserSettings,
} = require("../middlewares/requestValidations.js");
const { updateSettings } = require("../controllers/settingsController.js");

const router = express.Router();

router.patch("/update", validateUserSettings, updateSettings);

module.exports = router;
