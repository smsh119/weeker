const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/user.js");
const TaskCollection = require("../models/taskCollection.js");

const registerUser = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    res.status(400).json({ errors: errors.map((err) => err.msg) });
    return;
  }
  const userInfo = req.body;
  try {
    const existingUser = await User.findOne({ email: userInfo.email });

    if (existingUser) {
      res.status(400).json({
        errors: ["User already exists! Please try to log in."],
      });
      return;
    }
    const hash = await bcrypt.hash(
      userInfo.password,
      process.env.SALT_ROUNDS * 1
    );
    userInfo.password = hash;
    const user = await User.create(userInfo);

    // creating taskCollection for the new user
    await TaskCollection.create({
      userId: user._id,
    });

    res.status(201).json();
  } catch (err) {
    res.status(500).json({ errors: ["Internal Server Error!"] });
    console.log(err);
  }

  res.status(201).json();
};

module.exports = { registerUser };
