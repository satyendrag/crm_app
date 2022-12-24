const express = require("express");
const cookieParser = require("cookie-parser");
const config = require("./config/index");
const app = express();
const { connectWithDb } = require("./config/dbconfig");
const { insertAdmin } = require("./utils/insertAdmin");
const PORT = config.PORT || 3000;

connectWithDb();
(async function () {
  insertAdmin();
})();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRoutes = require("./routes/user.route");

app.use("/api/v1/auth/", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
