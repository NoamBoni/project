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
                amonut: {
                    type: Number,
                    required: true,
                    min: 1,
                    validate: {
                        validator: function (val) {
                            val = String(val);
                            return !val.includes('.');
                        },
                        message: "amount can't be float",
                    },
                },
                required: true,
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
