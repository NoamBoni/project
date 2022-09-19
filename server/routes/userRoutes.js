const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

const { roles } = authController;

router.use(
  authController.authenticateUser,
  authController.restrict(roles.admin)
);

router
  .route("/")
  .delete(userController.deleteUser)
  .put(userController.updateUser);

router.put("/promote", userController.promoteUser);

module.exports = router;
