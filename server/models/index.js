const mongoose = require("mongoose");
const Product = require("./product.model");
const Category = require("./category.model");
const Review = require("./review.model");
const Cart = require("./cart.model");
const Order = require("./order.model");
const User = require("./user.model");
// khai bao doi tuong co so du lieu
const dotenv = require("dotenv");   
const Size = require("./size.model");
dotenv.config();
const DB ={};

DB.Products = Product;
DB.Categorys = Category;
DB.Reviews = Review;
DB.Carts = Cart;
DB.Orders = Order;
DB.Users = User;
DB.Sizes = Size
DB.connectDB =  async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("Connected successfully to MongoDB server"))
    }
    catch(err){
        next(err);
        process.exit();       
    }
}
module.exports = DB;