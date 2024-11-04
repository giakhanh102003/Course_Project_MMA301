const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function createUser(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const newUser = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save().then((data) =>
      res.status(200).json({
        message: "Create new account success",
        data: data,
      })
    );
  } catch (error) {
    next(error);
  }
}
async function loginUser(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login success",
      token: token,
      user:{
        id: user._id,
        name: user.name,
      },
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login." });
  }
}
async function updateProfile(req, res, next) {
  try {
    const { name, password, address, phone } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (name) {
      user.name = name;
    }
    if (address) {
      user.address = address;
    }
    if (phone) {
      user.phone = phone;
    }
    await user.save();
    res.status(200).json({ message: "Update profile success", data: user });
  } catch (error) {
    next(error);
  }
}
async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json({ message: "Get users success", data: users });
  } catch (error) {
    next(error);
  }
}
const UserController = {
  createUser,
  loginUser,
  updateProfile,
  getUsers,
};
module.exports = UserController;
