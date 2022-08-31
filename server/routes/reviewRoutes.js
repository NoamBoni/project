const express = require('express');

const reviewController = require('../controllers/reviewController');

const router = express.Router();

router
    .route('/:productId')
    .all(reviewController.checkIfProductExist)
    .post(reviewController.createNewReview);

module.exports = router;
