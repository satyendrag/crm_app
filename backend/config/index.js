const dotenv = require("dotenv");
dotenv.config();

const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || "7d",
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  SMTP_MAIL_HOST: process.env.SMTP_MAIL_HOST,
  SMTP_MAIL_PORT: process.env.SMTP_MAIL_PORT,
  SMTP_MAIL_USER: process.env.SMTP_MAIL_USER,
  SMTP_MAIL_PASSWORD: process.env.SMTP_MAIL_PASSWORD,
  SMTP_SENDER_MAIL: process.env.SMTP_SENDER_MAIL,
};

module.exports = config;
