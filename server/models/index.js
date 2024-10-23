const mongoose = require("mongoose");
// khai bao doi tuong co so du lieu
const dotenv = require("dotenv");   
dotenv.config();
const DB ={};
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