const bodyParser = require("body-parser");
const express = require("express");
const { CartController } = require("../controllers");
const cartRouter = express.Router();
cartRouter.use(bodyParser.json());
cartRouter.post("/api/add-item-to-cart/:userId", async (req, res, next) => {
    CartController.addItemToCart(req, res, next);
});
module.exports = cartRouter;