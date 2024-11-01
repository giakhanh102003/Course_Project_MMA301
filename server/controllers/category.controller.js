const Category = require("../models/category.model");
async function createCategory(req, res, next) {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const exitCategory = await Category.findOne({ name });
        if (exitCategory) {
            return res.status(400).json({ message: "Category already exist" });
        }        
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(200).json({ message: "Create new category success", data: newCategory });
    } catch (error) {
        next(error);
    }
}

async function getCategories(req, res, next) {
    try {
        const categories = await Category.find();
        res.status(200).json({ message: "Get categories success", data: categories });
    } catch (error) {
        next(error);
    }
}
const CategoryController = {
    createCategory,
    getCategories,
};
module.exports = CategoryController