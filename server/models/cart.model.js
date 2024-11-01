const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
                required: [true, "Please add a total"],
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: [true, "Please add a total"],
    },
}, {
    timestamps: true,
});
cartSchema.pre("save", function (next) {
    // Tính tổng giá trị các item
    this.totalPrice = this.items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    next();
});
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
