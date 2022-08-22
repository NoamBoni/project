const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required!'],
        trim: true,
        unique: true,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    category: {
        type: String,
        enum: ['dogs', 'cats', 'birds', 'ferrets'],
        required: true,
    },
    color: String,
    age: {
        type: String,
        enum: ['baby', 'young', 'old'],
        required: true,
    },
    size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        required: true,
        default: 'medium',
    },
    images: [String],
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
