const express = require("express");
const router = express.Router();
const vegetablesController = require("../controllers/Vegetables");
const vegetablesValidator = require("../middleware/validators/vegetables");
const { roles } = require("../config/constants");
const { permit } = require("../middleware/role");
const isAuthenticated = require("../middleware/jwt");
/* GET users listing. */

router.post(
  "/create",
  isAuthenticated,
  vegetablesValidator,
  vegetablesController.create
);
router.put(
  "/update/:id",
  isAuthenticated,
  // permit([roles.Admin]),
  vegetablesValidator,
  vegetablesController.update
);
router.get(
  "/list",
  isAuthenticated,
  // permit([roles.Admin]),
  vegetablesController.list
);

router.get(
  "/show/:id",
  isAuthenticated,
  //permit([roles.Admin]),
  vegetablesController.show
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  //permit([roles.Admin]),
  vegetablesController.delete
);

//.route("/")

//.get(userController.list);

// router
//   .route("/:id")
//   .put(userValidator, userController.update)
//   .get(userController.show)
//   .delete(userController.delete);

module.exports = router;
