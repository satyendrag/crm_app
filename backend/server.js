const express = require("express");
const config = require("./config/index");
const app = express();
const { connectWithDb } = require("./config/dbconfig");
const { insertAdmin } = require("./utils/insertAdmin");
const PORT = config.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectWithDb();
(async function () {
  insertAdmin();
})();
const authRoutes = require("./routes/user.route");

app.use("/api/v1/auth/", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
