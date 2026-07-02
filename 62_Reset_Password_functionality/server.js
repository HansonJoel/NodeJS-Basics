const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Handling Uncaught Exceptions Globally
process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception Occurred. Shutting down...", error);

  process.exit(1);
});

const app = require("./app");

// connecting to MongoDB
const mongoURL = process.env.mongoURL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.log("Error connecting to Database", err.message);
  }
};

const PORT = process.env.PORT || 3000;

// Connect to MongoDB before starting the server
connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server currently running on http://:${PORT}/`);
});

// Handling Unhandled Promise Rejections Globally
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  server.close(() => {
    process.exit(1); // exit the process with failure
  });
  // Application specific logging, throwing an error, or other logic here
});
