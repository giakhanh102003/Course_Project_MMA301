const bodyParser = require("body-parser");
const express = require("express");
const { ProductController } = require("../controllers");
const productRouter = express.Router();
productRouter.use(bodyParser.json());
productRouter.post("/api/create", async (req, res, next) => {
    ProductController.createProduct(req, res, next);
});
productRouter.get("/api/list-all", async (req, res, next) => {
    ProductController.getProducts(req, res, next);
});
productRouter.get("/api/getProduct/:id", async (req, res, next) => {
    ProductController.getProductById(req, res, next);
})
module.exports = productRouter;