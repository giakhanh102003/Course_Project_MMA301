const mongoose = require("mongoose");
const orderDetailSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
    }
})
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderDetail: [orderDetailSchema],
    totalPrice: {
      type: Number,
      required: [true, "Please add a total"],
    },
    shippingAddress: {
      type: Object,
      required: [true, "Please add an address"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "paypal"],
      default: "cod",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
