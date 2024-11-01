const express = require("express");
const morgan = require("morgan");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const httpErrors = require("http-errors");
const DB = require("./models/index");
const userRouter = require("./routes/user.route");
const categoryRouter = require("./routes/category.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
require("dotenv").config();

// khoi tao web server bang express
const app = express();

// them cac middleware vao web server
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());


app.get("/", async (req, res, next) => {
    res.status(200).json({ message: "Welcome to Server Of React Native" });
  });
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

// them middleware xu ly loi tren : router , Controller , Model
app.use(async (req, res, next) => {
  //   next(createError(404,'Không tìm thấy trang '));
  next(httpErrors.BadRequest("Bad Request "));
});

// kiem soat loi bat ki trong web server
app.use(async (err, req, res, next) => {
  //lay status code thuc te dang gap phai
  res.status(err.status || 500);
  res.json({
    status: err.status,
    message: err.message,
  });
});

const HOST = process.env.HOST_NAME || "localhost";
const PORT = process.env.PORT || 8000;
app.listen(PORT, HOST, async () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  await DB.connectDB();
});
