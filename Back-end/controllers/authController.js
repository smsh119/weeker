const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/user.js");
const TaskCollection = require("../models/taskCollection.js");
const { generateJWT } = require("../utils/utils.js");
const { generateVerificationToken } = require("../utils/utils.js");
const { hashToken } = require("../utils/utils.js");
const { sendEmail } = require("../services/emailService.js");
const {
  getVerificationEmailHtml,
} = require("../services/emailTemplates/emailTemplates.js");

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
      process.env.SALT_ROUNDS * 1,
    );

    // creating verification token for email verification
    const { verificationToken, hashedToken } = generateVerificationToken();

    userInfo.password = hash;
    const user = await User.create({
      ...userInfo,
      isVerified: false,
      verificationToken: hashedToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // creating taskCollection for the new user
    await TaskCollection.create({
      userId: user._id,
    });

    // verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify?token=${verificationToken}&email=${user.email}`;
    const emailHtml = getVerificationEmailHtml({
      fullname: userInfo.fullname,
      verificationUrl,
    });
    await sendEmail(user.email, "Weeker: Verify your email", emailHtml);

    res.status(201).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: ["Internal Server Error!"] });
  }

  res.status(201).json();
};

const loginUser = async (req, res) => {
  // form validation
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    res.status(401).json({ errors: errors.map((err) => err.msg) });
    return;
  }

  try {
    const userInfo = req.body;

    // check user in the db
    const user = await User.findOne({ email: userInfo.email });
    if (!user) {
      res
        .status(401)
        .json({ errors: ["Wrong email or password! Please try again."] });
      return;
    }

    // check pass validation
    const isValid = await bcrypt.compare(userInfo.password, user.password);
    if (!isValid) {
      res
        .status(401)
        .json({ errors: ["Wrong email or password! Please try again."] });
      return;
    }

    // generate jwt token
    const payload = {
      fullname: user.fullname,
      email: user.email,
      id: user._id.toString(),
    };
    const token = generateJWT(payload, "7d");
    res.cookie("Token", token, { httpOnly: true });

    res.status(200).json({
      name: user.fullname,
      email: user.email,
      isVerified: user.isVerified,
      settings: user?.settings,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: ["Internal Server Error!"] });
  }
};

const verifyEmail = async (req, res) => {
  const { token, email } = req.body;

  if (!token || !email) {
    res.status(400).json({ errors: ["Invalid verification link!"] });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ errors: ["Invalid verification link!"] });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ errors: ["Email is already verified."] });
      return;
    }

    const hashedToken = hashToken(token);
    if (user.verificationToken !== hashedToken) {
      res.status(400).json({ errors: ["Invalid verification token!"] });
      return;
    }

    if (user.verificationTokenExpiresAt < Date.now()) {
      res.status(400).json({ errors: ["Verification link has expired."] });
      return;
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    user.resendCount = 0;
    user.lastResendAt = undefined;
    await user.save();

    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: ["Internal Server Error!"] });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("Token");
  res.status(200).json();
};

const RESEND_LIMIT = 3;
const RESEND_WINDOW_MS = 24 * 60 * 60 * 1000;

const resendVerificationEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      res.status(400).json({ errors: ["User not found!"] });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ errors: ["Email is already verified."] });
      return;
    }

    const now = Date.now();
    if (
      user.lastResendAt &&
      now - user.lastResendAt.getTime() < RESEND_WINDOW_MS &&
      user.resendCount >= RESEND_LIMIT
    ) {
      res.status(429).json({
        errors: [
          "Too many requests. Please try again after 24 hours.",
        ],
      });
      return;
    }

    if (
      !user.lastResendAt ||
      now - user.lastResendAt.getTime() >= RESEND_WINDOW_MS
    ) {
      user.resendCount = 0;
    }

    const { verificationToken, hashedToken } = generateVerificationToken();

    user.verificationToken = hashedToken;
    user.verificationTokenExpiresAt = now + 24 * 60 * 60 * 1000;
    user.resendCount = (user.resendCount || 0) + 1;
    user.lastResendAt = new Date(now);
    await user.save();

    const verificationUrl = `${process.env.CLIENT_URL}/verify?token=${verificationToken}&email=${user.email}`;
    const emailHtml = getVerificationEmailHtml({
      fullname: user.fullname,
      verificationUrl,
    });
    await sendEmail(user.email, "Weeker: Verify your email", emailHtml);

    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: ["Internal Server Error!"] });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  resendVerificationEmail,
};
