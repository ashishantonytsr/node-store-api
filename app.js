require("dotenv").config();

// async errors
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const products = require("./routes/products");
const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const productsRouter = require("./routes/products");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1> <a href="/api/v1/products">Products Route</a>');
});

// products route
app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;
const mongo_uri = process.env.MONGO_URI;

const start = async () => {
  try {
    console.log(`Connecting to Database ... `);
    // connectdb
    await connectDB(mongo_uri);
    app.listen(port, () => console.log(`Server is listening to port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
