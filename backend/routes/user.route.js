const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const { isLoggedIn } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup/", signup);
router.post("/signin/", signin);
router.get("/getuser", isLoggedIn, async (req, res) =>
  res.status(200).send({ success: true })
);

module.exports = router;
