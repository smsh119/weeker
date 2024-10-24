const jwt = require("jsonwebtoken");

const generateJWT = (payload, expiration) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiration });
};

module.exports = { generateJWT };
