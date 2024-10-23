const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is duplicate"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value) => {
        return value.length >= 6;
      },
      message: "Password must be at least 6 characters",
    },
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
