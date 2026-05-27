const express = require("express");
const morgan = require("morgan");
const hotelRouter = require("./routers/hotelsRouter");
const userRouter = require("./routers/usersRouter");
const AppError = require("./utilities/appError");
const globalErrorHandler = require("./controller/errorController");

const app = express();

// 1. Body parsers
app.use(morgan("dev"));
app.set("query parser", "extended");
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
console.log("Environment: ", process.env.NODE_ENV);

// 2. Custom middleware
// const logger = (req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// };

// app.use(logger);

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

// 3. Routes
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/users", userRouter);

// 4. Home route
app.get("/", (req, res) => {
  res.send("Welcome to my Express.js application!");
});

//5. 404 handler
app.all("*splat", (req, res, next) => {
  const error = new AppError(
    `Cannot find the resource '${req.originalUrl}'`,
    404,
  );
  next(error);

  next(error);
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
