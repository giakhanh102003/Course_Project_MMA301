const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a product name"],
        unique: [true, "Product name must be unique"],
    },
    productLine: {
      type: String,
      enum: ["Air Max","Jordan", "Air Force","Pegasus", "Phantom",],
      required: [true, "Please add a product line"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },  
    price: {
        type: Number,
        required: [true, "Please add a price"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
    size :{
        type: String,
        enum: ["39", "40", "41", "42", "43", "44", "45"],
        required: [true, "Please add a size"],
    },
    color :{
        type: String,
        required: [true, "Please add a color"],
    },
    unitInStock: {
        type: Number,
        required: [true, "Please add a unit in stock"],
    },
    image: {
        type: String,
        required: [true, "Please add an image"],
    },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;