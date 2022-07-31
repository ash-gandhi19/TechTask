const express = require("express");
const router = express.Router();

const loginController = require("../controllers/Login");
const loginValidator = require("../middleware/validators/login");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/login", loginValidator, loginController.login);
module.exports = router;
