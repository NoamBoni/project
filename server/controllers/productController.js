const Product = require('../models/productModel');

module.exports.createNewProduct = (req, res) => {
    res.send('post works!');
};

module.exports.getAllProducts = (req, res) => {
    res.send('get works!');
};
