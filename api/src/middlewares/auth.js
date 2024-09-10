const User = require("./../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");

async function isLoggined(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("access denied");
  try {
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const user = await User.findById(decoded._id);
    console.log(user);
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}

async function isAdmin(req, res, next) {
  if (!req.user.isadmin) return res.status(403).send("access denied");
  next();
}

module.exports = { isLoggined ,isAdmin };
