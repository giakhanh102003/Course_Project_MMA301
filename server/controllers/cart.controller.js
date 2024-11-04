const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Size = require("../models/size.model");
const Color = require("../models/color.model");
async function addItemToCart(req, res, next) {
  try {
    const { userId } = req.params;
    const { productId, quantity, size, color } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      cart = await Cart.create({
        user: userId,
        items: [
          { product: productId, quantity, price: product.price, size, color },
        ],
      });

      return res.status(201).json(cart);
    }

    // Kiểm tra sản phẩm với size và color
    const existingItem = cart.items.find(
      (item) =>
        item.product &&
        item.product.toString() === productId &&
        item.size &&
        item.size.toString() === size &&
        item.color &&
        item.color.toString() === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
        size,
        color,
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getCart(req, res, next) {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product", "name image")
      .populate("items.size", "size")
      .populate("items.color", "colorName")
      .exec();
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // const formattedCartItems = cart.items.map((item) => ({
    //   productId: item.product._id,
    //   quantity: item.quantity,
    //   price: item.price,
    //   size: item.size.size,
    //   color: item.color.colorName,
    // }))
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function deleteItemInCart(req, res, next) {
    try {
        const { userId } = req.params;
        const { productId, size, color } = req.body;

        // Tìm giỏ hàng của người dùng
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const existingItem = cart.items.find(
            (item) =>
                item.product.toString() === productId &&
                item.size.toString() === size &&
                item.color.toString() === color
        );

        if (!existingItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Xóa item khỏi giỏ hàng bằng phương thức pull
        cart.items = cart.items.filter(
            (item) =>
                !(item.product.toString() === productId &&
                  item.size.toString() === size &&
                  item.color.toString() === color)
        );

        await cart.save();

        // Populate và trả về giỏ hàng
        await cart.populate("items.product", "name"); // Populate sản phẩm
        await cart.populate("items.size", "size"); // Populate kích thước
        await cart.populate("items.color", "colorName"); // Populate màu

        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const CartController = {
  addItemToCart,
  getCart,
  deleteItemInCart
};
module.exports = CartController;
