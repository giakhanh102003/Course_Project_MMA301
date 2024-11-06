const bodyParser = require("body-parser");
const express = require("express");
const User = require("../models/user.model");
const {UserController} = require("../controllers");
const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.post("/api/register", async (req, res, next) => { 
    UserController.createUser(req, res, next);
})
userRouter.post("/api/login", async (req, res, next) => { 
    UserController.loginUser(req, res, next);
})
userRouter.patch("/api/updateProfile/:id", async (req, res, next) => {
    UserController.updateProfile(req, res, next);
})
userRouter.get("/api/users", async (req, res, next) => {
    UserController.getUsers(req, res, next);
})
userRouter.get("/api/getUser/:id", async (req, res, next) => {
    UserController.getUser(req, res, next);
})
module.exports = userRouter