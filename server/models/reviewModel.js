const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    product: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        reqired: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    reviewer: {
        type: String,
        required: true,
    },
});

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;
