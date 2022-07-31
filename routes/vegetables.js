const express = require("express");
const router = express.Router();
const vegetablesController = require("../controllers/Vegetables");
const vegetablesValidator = require("../middleware/validators/vegetables");
const { roles } = require("../config/constants");
const { permit } = require("../middleware/role");
const isAuthenticated = require("../middleware/jwt");

/*To create vegetable data*/
router.post(
  "/create",
  isAuthenticated,
  vegetablesValidator,
  vegetablesController.create
);

/*To update vegetable data*/
router.put(
  "/update/:id",
  isAuthenticated,
  vegetablesValidator,
  vegetablesController.update
);

/*To get list of  vegetable data*/
router.get("/list", vegetablesController.list);

/*To get list of  vegetable data by id*/
router.get("/show/:id", isAuthenticated, vegetablesController.show);

/*To delete vegetable data by id*/
router.delete("/delete/:id", isAuthenticated, vegetablesController.delete);

module.exports = router;
