const express = require("express");
const hotelRouter = require("./routers/hotelsRouter");

// create express app
const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.send("Welcome to my Express.js application!");
});

// instead of writing the above code, we can use route chaining to write it in a more concise way
app.use("/api/v1/hotels", hotelRouter);
module.exports = app;
