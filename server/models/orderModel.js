const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderedAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'products',
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 1,
          validate: {
            validator: function (val) {
              return val === Math.floor(val);
            },
            message: "amount can't be float",
          },
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;
