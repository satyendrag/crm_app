const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { UserStatus } = require("./UserStatus");
const { AuthRoles } = require("./AuthRoles");
exports.insertAdmin = async () => {
  const user = await User.findOne({ email: "admin@dev.io" });
  if (user) {
    return;
  }
  User.create({
    name: "admin",
    email: "admin@dev.io",
    password: await bcrypt.hash("admin", 10),
    userStatus: UserStatus.APPROVED,
    role: AuthRoles.ADMIN,
  }).then(() => {
    console.log("Admin inserted");
  });
};
