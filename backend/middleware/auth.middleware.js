const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.model");
const { AuthRoles } = require("../utils/AuthRoles");
const { UserStatus } = require("../utils/UserStatus");

exports.isLoggedIn = async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(400).send({
      success: false,
      message: "Login first to access the page.",
    });
  }
  const id = jwt.decode(token, config.JWT_SECRET)._id;
  const user = await User.findById(id);
  req.user = user;
  next();
};

exports.isAdmin = async (req, res, next) => {
  if (req.user.role !== AuthRoles.ADMIN) {
    return res.status(403).send({
      success: false,
      message: "Admin previleg required",
    });
  }
  next();
};
