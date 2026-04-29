const express = require("express");
const morgan = require("morgan");
const hotelRouter = require("./routers/hotelsRouter");

const app = express();

// 1. Body parsers
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Custom middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

// 3. Routes
app.use("/api/v1/hotels", hotelRouter);

// 4. Home route
app.get("/", (req, res) => {
  res.send("Welcome to my Express.js application!");
});

// 5. 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

module.exports = app;
