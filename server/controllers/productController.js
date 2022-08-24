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
