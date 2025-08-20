const { validationResult } = require("express-validator");
const User = require("../models/user.js");

const updateSettings = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    res.status(400).json({ errors: errors.map((err) => err.msg) });
    return;
  }
  const userInfo = req.user;
  const userSettings = req.body;
  try {
    const user = await User.findOne({ email: userInfo.email });
    user.settings = userSettings;
    await user.save();
    res.status(200).json(userSettings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: ["Internal Server Error!"] });
  }
};

module.exports = { updateSettings };
