const bcrypt = require("bcrypt");
const User = require("../Schema/userSchema");

const SALT_ROUNDS = 10;

function hash(password) {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hashed = bcrypt.hashSync(password, salt);
  return hashed;
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/user/login");
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect("/user");
}

function isAdmin(req, res, err, next) {
  if (req.username === "admin") {
    return next();
  }
  res.render("error");
}

module.exports.hash = hash;
module.exports.isLoggedIn = isLoggedIn;
module.exports.isLoggedOut = isLoggedOut;
module.exports.isAdmin = isAdmin;
