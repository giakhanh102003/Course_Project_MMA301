const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");

async function createOrder(req, res, next) {
  const userId = req.params.userId;
  const {address, phone} = req.body
  const user = await User.findById(userId);
  const cartOfUser = await Cart.findOne({ user: userId });
  try {
    if(!cartOfUser) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (address == null || phone == null) {
        res.status(400).json({ message: "You need to enter the shippingaddress and phone number" });
    }
    const order = new Order({
        user: userId,
        orderDetail: cartOfUser.items,
        totalPrice: cartOfUser.totalPrice,
        shippingAddress: address,
        phone: phone,
        paymentMethod: "cod",
      });
      await order.save();
      await Cart.deleteOne({ user: userId });
      res.status(201).json({ message: "Create order success", result: order });
  } catch (error) {
    next(error);
  }
}
async function getOrdersByUserId(req, res, next) {
    const { userId } = req.params;
    try {
      const orders = await Order.find({ user: userId });
      res.status(200).json({ message: "Get orders success", data: orders });
    } catch (error) {
      next(error);
    }
}
const OrderController = {
  createOrder,
  getOrdersByUserId,
};
module.exports = OrderController;
