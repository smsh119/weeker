const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateJWT = (payload, expiration) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiration });
};

const validateJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

const generateVerificationToken = () => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  return { verificationToken, hashedToken };
};

module.exports = { generateJWT, validateJWT, generateVerificationToken };
