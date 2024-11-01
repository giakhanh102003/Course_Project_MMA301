const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price:{
        type: Number,
    } ,
    size : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
    },
    color : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
    }
  },
  { _id: false } // Tắt tạo _id cho từng mục trong items
);
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      // required: [true, "Please add a total"],
    },
  },
  {
    timestamps: true,
  }
);
cartSchema.pre("save", function (next) {
  // Tính tổng giá trị các item
  this.totalPrice = this.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  next();
});
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
