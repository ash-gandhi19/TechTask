const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const userValidator = require("../middleware/validators/user");
const { roles } = require("../config/constants");
const { permit } = require("../middleware/role");
const isAuthenticated = require("../middleware/jwt");

/*To create user data*/
router.post("/create", userValidator, userController.create);

/*To update user data*/
router.put(
  "/update/:id",
  isAuthenticated,
  permit([roles.Admin]),
  userValidator,
  userController.update
);
/*To get list of  user data*/
router.get(
  "/list",
  isAuthenticated,
  permit([roles.Admin]),
  userController.list
);

/*To get list of  user data by id*/
router.get(
  "/show/:id",
  isAuthenticated,
  permit([roles.Admin]),
  userController.show
);

/*To delete user data by id */
router.delete(
  "/delete/:id",
  isAuthenticated,
  permit([roles.Admin]),
  userController.delete
);
module.exports = router;
