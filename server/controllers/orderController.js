const Order = require('../models/orderModel');
const { sendRes } = require('../helpers/sendRes');

module.exports.createNewOrder = async (req, res) => {
  const { user, products } = req.body;
  try {
    const order = await Order.create({ user, products });
    sendRes(res, order, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.getAllOrders = async (req, res) => {
  const { id } = req.query;
  try {
    let orders = await Order.find({ user: id })
      .populate({
        path: 'user',
        select: 'address -_id',
      })
      .populate({
        path: 'products',
        populate: {
          path: 'product',
          select: 'name price category',
        },
      })
      .lean();

    orders = orders.map(order => {
      order.totalPrice = order.products.reduce(
        (prev, curr) => prev + curr.product.price * curr.amount,
        0
      );
      return order;
    });

    sendRes(res, orders, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};
