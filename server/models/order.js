const mongoose = require('mongoose');
const { productSchema } = require('./product');

const orderSchema = mongoose.Schema({
    products: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                required: true,
            }
        }
    ],
    totalPrice: {
        type: Number,
        requried: true,
    },
    address: {
        type: String,
        requried: true,
    },
    userId: {
        type: String,
        requried: true,
    },
    orderAt: {
        type: Number,
        requried: true,
    },
    orderStatus: {
        type: Number,
        default: 0,
    }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;