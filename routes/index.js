const express = require("express");
const router = express.Router();

const loginController = require("../controllers/Login");
const loginValidator = require("../middleware/validators/login");
const { roles } = require("../config/constants");
const { permit } = require("../middleware/role");

//const roleController = require('../controllers/role.controller');
//const fileUploadRouter = require('./file-upload.route');
const authenticateJwt = require("../middleware/jwt");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", loginValidator, loginController.login);
// router.post(userValidator,);
// const authMiddleware = [permit([roles.Admin])];

//router.use('/roles', authMiddleware, roleController.list)
//router.use('/file-upload', fileUploadRouter);
module.exports = router;
