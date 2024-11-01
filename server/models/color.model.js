const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
    colorName: {
        type: String,
        required: [true, "Please add a color"],
    },
})

const Color = mongoose.model("Color", colorSchema);
module.exports = Color;
