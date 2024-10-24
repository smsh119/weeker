const jwt = require("jsonwebtoken");

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

module.exports = { generateJWT, validateJWT };
