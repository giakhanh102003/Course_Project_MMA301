const bodyParser = require("body-parser");
const express = require("express");
const { CartController } = require("../controllers");
const cartRouter = express.Router();
cartRouter.use(bodyParser.json());
cartRouter.post("/api/add-item-to-cart/:userId", async (req, res, next) => {
    CartController.addItemToCart(req, res, next);
});
cartRouter.get("/api/getCart/:userId", async (req, res, next) => {
    CartController.getCart(req, res, next);
});
cartRouter.delete("/api/delete-item/:userId", async (req, res, next) => {
    CartController.deleteItemInCart(req, res, next);
})
cartRouter.patch("/api/update-quantity-item/:userId", async (req, res, next) => {
    CartController.changeQuantity(req, res, next);
})
module.exports = cartRouter;