const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();

router
    .route('/')
    .get(productController.getAllProducts)
    .post(productController.createNewProduct);

router
    .route('/:id')
    .all(productController.checkValidId)
    .get(productController.getProductById)
    .delete(productController.deleteProductById)
    .put(productController.updateProduct);

module.exports = router;
