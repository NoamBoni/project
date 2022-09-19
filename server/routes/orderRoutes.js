const express = require("express");

const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.authenticateUser);

router
  .route("/")
  .post(orderController.createNewOrder)
  .get(orderController.getAllOrders);

module.exports = router;
