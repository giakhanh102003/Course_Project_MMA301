const bodyParser = require("body-parser");
const express = require("express");
const { OrderController } = require("../controllers");
const orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter.post("/api/create-order/:userId", async (req, res, next) => {
    OrderController.createOrder(req, res, next);
})

orderRouter.get("/api/get-orders/:userId", async (req, res, next) => {
    OrderController.getOrdersByUserId(req, res, next);
})
module.exports = orderRouter