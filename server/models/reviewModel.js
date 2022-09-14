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
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true,
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'products',
    },
});

reviewSchema.pre(/find/, function (next) {
    this.populate({
        path: 'reviewer',
        select: 'username email',
    });
    next();
});

const Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;
