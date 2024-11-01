const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
              },
        },
    ],
    totalPrice: {
        type: Number,
        required: [true, "Please add a total"],
    },
    shippingAddress: {
        type: Object,
        required: [true, "Please add an address"],
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "paypal"],
    },
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema); 

module.exports = Order   