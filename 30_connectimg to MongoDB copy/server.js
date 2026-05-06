const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");

// connecting to MongoDB
const mongoURL = process.env.mongoURL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};

// Hotel Schema
const hotelSchema = new mongoose.Schema({
  name: String,
  price: Number,
  city: String,
});

// Model
const Hotel = mongoose.model("Hotel", hotelSchema);

const hotel1 = new Hotel({
  name: "Hotel California",
  price: 5200,
  city: "Los Angeles",
});
hotel1.save();

const PORT = 3000;
const HOSTNAME = "localhost";

// Connect to MongoDB before starting the server
connectDB();

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
