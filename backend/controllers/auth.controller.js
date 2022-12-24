const User = require("../models/user.model");
const { AuthRoles } = require("../utils/AuthRoles");
const { UserStatus } = require("../utils/UserStatus");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/index");

exports.signup = async (req, res) => {
  let {
    name,
    email,
    password,
    role = AuthRoles.CUSTOMER,
    userStatus = UserStatus.APPROVED,
  } = req.body;

  if (!name || !email || !password) {
    // return 400 error
    return res.status(400).send({
      success: false,
      message: "Please provide name email and password",
    });
  }

  if (role !== AuthRoles.CUSTOMER) {
    userStatus = UserStatus.PENDING;
  }

  password = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      name,
      email,
      password,
      role,
      userStatus,
    });
    // const token = await jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    //   expiresIn: config.JWT_EXPIRY,
    // });
    // res.cookie("token", token, {
    //   maxAge: new Date(Date.now() + 1000 * 60 * 30),
    //   httpOnly: true,
    // });

    user.password = undefined;
    res.status(201).send({
      success: true,
      message: "User created Successfully",
      user,
    });
  } catch (err) {
    // return 500 error
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).send({
      success: false,
      message: "Please provide email and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).send({
      success: false,
      message: "Invalid UserName/Password",
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).send({
      success: false,
      message: "Invalid UserName/Password",
    });
  }
  if (user.userStatus !== UserStatus.APPROVED) {
    return res.status(400).send({
      success: false,
      message: "Please Wait till admin approve your login",
    });
  }
  const token = await jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRY,
  });
  res.cookie("token", token, {
    maxAge: new Date(Date.now() + 1000 * 60 * 30),
    httpOnly: true,
  });
  user.password = undefined;
  res.status(200).send({
    success: true,
    message: "Logged in successfully",
    token: token,
    user,
  });
};
