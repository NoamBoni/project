const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();

// url = "localhost:8000/products/"
router
.route('/')
.get(productController.getAllProducts)
.post(productController.createNewProduct);


// url = "localhost:8000/products/some-id"
router
    .route('/:id')
    .all(productController.checkValidId)
    .get(productController.getProductById)
    .delete(productController.deleteProductById)
    .put(productController.updateProduct);

module.exports = router;
