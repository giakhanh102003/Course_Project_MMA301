const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
async function addItemToCart(req, res, next) {
    try {
        const { userId } = req.params; // ID của user
        const { productId, quantity } = req.body; // ID của sản phẩm và số lượng

        // Tìm giỏ hàng của user
        let cart = await Cart.findOne({ user: userId });

        // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng
        if (!cart) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            // Tạo giỏ hàng mới với sản phẩm đầu tiên
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity, price: product.price }],
            });

            return res.status(201).json(cart);
        }

        // Nếu giỏ hàng đã tồn tại, kiểm tra sản phẩm
        const existingItem = cart.items.find((item) => item.product.toString() === productId);

        if (existingItem) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng và tính lại giá
            existingItem.quantity += quantity;
        } else {
            // Nếu sản phẩm chưa có, thêm vào giỏ hàng
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            cart.items.push({
                product: productId,
                quantity,
                price: product.price,
            });
        }
        await cart.save(); // Lưu giỏ hàng
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const CartController = {
    addItemToCart,
};
module.exports = CartController;