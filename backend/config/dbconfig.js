const mongoose = require("mongoose");
const config = require("./index");
const connectWithDb = () => {
  console.log(config.MONGODB_URL);
  mongoose
    .connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Db connected");
    })
    .catch(() => {
      console.log("Error in db connection");
    });
};

module.exports.connectWithDb = connectWithDb;
