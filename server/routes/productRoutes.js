const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

const { roles } = authController;

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.authenticateUser,
    authController.restrict(roles.editor),
    productController.createNewProduct
  );

router.use(productController.checkValidId);

router.route("/:id").get(productController.getProductById);

router.use(
  authController.authenticateUser,
  authController.restrict(roles.editor)
);

router
  .route("/:id")
  .delete(productController.deleteProductById)
  .put(productController.updateProduct);

module.exports = router;
