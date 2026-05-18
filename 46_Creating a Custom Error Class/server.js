const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
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

app.listen(PORT, () => {
  console.log(`Server currently running on http://:${PORT}/`);
});
