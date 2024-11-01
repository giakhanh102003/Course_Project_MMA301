const Product = require("../models/product.model");
const Category = require("../models/category.model");
async function getProducts(req, res, next) {
    try {
        const products = await Product.find({});
        res.status(200).json({products});
    } catch (error) {
        next(error);
    }
}
async function createProduct(req, res, next) {
    try {
        const { name, productLine, category, price, description, size,color,unitInStock,image} = req.body;
        const newProduct = new Product({ name, productLine, category, price, description, size,color,unitInStock,image});       
        await newProduct.save();
        res.status(200).json({ message: "Create new product success", data: newProduct });
    } catch (error) {
        next(error);
    }
}
const ProductController = {
    getProducts,    
    createProduct
};
module.exports = ProductController