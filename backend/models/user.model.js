const { UserStatus } = require("../utils/UserStatus");

const mongoose = require("mongoose");
const { AuthRoles } = require("../utils/AuthRoles");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: [true, "Name field is required"],
    },
    email: {
      unique: true,
      type: String,
      requried: [true, "Email field is required"],
    },
    password: {
      type: String,
      requried: [true, "Password field is required"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.CUSTOMER,
    },
    userStatus: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.APPROVED,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
