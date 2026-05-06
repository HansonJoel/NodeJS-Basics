const mongoose = require("mongoose");
const app = require("./app");

// connecting to MongoDB
const mongoURL =
  "mongodb+srv://admin:test1234@cluster0.itpxmtu.mongodb.net/?appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};

// const db = mongoose.connection;

// db.on("disconnected", () => {
//   console.log("MongoDB disconnected");
// });

const PORT = 3000;
const HOSTNAME = "localhost";

// Connect to MongoDB before starting the server
connectDB();

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
