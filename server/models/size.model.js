const mongoose = require("mongoose");   
const sizeSchema = new mongoose.Schema({
    size: {
        type: Number,
        required: [true, "Please add a size"],
    },
}, {
    timestamps: true,
});
const Size = mongoose.model("Size", sizeSchema);
module.exports = Size;      
