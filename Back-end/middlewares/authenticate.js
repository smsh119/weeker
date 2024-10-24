const { validateJWT } = require("../utils/utils.js");

const authenticate = (req, res, next) => {
  const token = req?.cookies?.Token;
  if (!token) {
    res.status(401).json();
    return;
  }
  const user = validateJWT(token);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json();
  }
};

module.exports = authenticate;
