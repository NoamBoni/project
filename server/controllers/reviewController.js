const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const { sendRes } = require('../helpers/sendRes');

module.exports.checkIfProductExist = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) throw new Error('product does not exist');
        req.product = product;
    } catch (err) {
        sendRes(res, err, 400, true);
    }
    next();
};

module.exports.createNewReview = async (req, res) => {
    try {
        const { title, description, stars, reviewer } = req.body;
        const review = await Review.create({
            title,
            description,
            stars,
            reviewer,
            // product:req.product._id
            product: req.params.productId,
        });
        sendRes(res, review, 201);
    } catch (err) {
        sendRes(res, err, 400, true);
    }
};