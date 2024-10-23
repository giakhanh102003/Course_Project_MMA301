const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a category name"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
}, {
    timestamps: true,
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;