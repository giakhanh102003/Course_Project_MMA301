const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Review must belong to a user"],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Review must belong to a product"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Please add a rating (1-5)"],
    },
    comment: {
        type: String,
        required: [true, "Please add a comment"],
    },
}, {
    timestamps: true,
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;