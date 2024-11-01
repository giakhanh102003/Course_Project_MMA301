const bodyParser = require("body-parser");
const express = require("express");
const { CategoryController } = require("../controllers");
const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());
categoryRouter.post("/api/create", async (req, res, next) => {
    CategoryController.createCategory(req, res, next);
  });
  categoryRouter.get("/api/list", async (req, res, next) => {
    CategoryController.getCategories(req, res, next);
  });
  module.exports = categoryRouter;