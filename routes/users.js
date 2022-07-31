const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");
const userValidator = require("../middleware/validators/user");
const { roles } = require("../config/constants");
const { permit } = require("../middleware/role");
const isAuthenticated = require("../middleware/jwt");
/* GET users listing. */

router.post("/create", userValidator, userController.create);
router.put(
  "/update/:id",
  isAuthenticated,
  permit([roles.Admin]),
  userValidator,
  userController.update
);
router.get(
  "/list",
  isAuthenticated,
  permit([roles.Admin]),
  userController.list
);

router.get(
  "/show/:id",
  isAuthenticated,
  permit([roles.Admin]),
  userController.show
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  permit([roles.Admin]),
  userController.delete
);
//.route("/")

//.get(userController.list);

// router
//   .route("/:id")
//   .put(userValidator, userController.update)
//   .get(userController.show)
//   .delete(userController.delete);

module.exports = router;
