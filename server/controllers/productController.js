const mongoose = require('mongoose');

const Product = require('../models/productModel');
const { sendRes } = require('../helpers/sendRes');
const { makeFilterObject } = require('../helpers/makeFilterObject');

module.exports.createNewProduct = async (req, res) => {
    try {
        const { name, price, images, category, color, age, size } = req.body;
        const newProduct = await Product.create({
            name,
            price,
            images,
            category,
            color,
            age,
            size,
        });
        sendRes(res, newProduct, 201);
    } catch (err) {
        sendRes(res, err, 400, true);
    }
};

module.exports.getAllProducts = async (req, res) => {
    const filterObject = makeFilterObject(req.query);
    try {
        const products = await Product.find(filterObject);
        sendRes(res, products, 200);
    } catch (err) {
        sendRes(res, err, 400, true);
    }
};

module.exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate('reviews');
        if (!product) throw new Error('id does not exist');
        sendRes(res, product, 200);
    } catch (err) {
        sendRes(res, err, 400, true);
    }
};

module.exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        sendRes(res, {}, 204);
    } catch (err) {
        sendRes(res, err, 400, true);
    }
};

module.exports.checkValidId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const error = { message: 'invalid id' };
        sendRes(res, error, 400, true);
        return;
    }
    next();
};

module.exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        sendRes(res, product, 200);
    } catch (err) {
        sendRes(res, err, 400, true);
    }
};
