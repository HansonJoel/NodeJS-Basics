const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Hotel = require("../models/hotel");

// MongoDB connection string
const mongoURL = process.env.mongoURL;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Script: Database connected");
  } catch (err) {
    console.log("Script: Error connecting to database");
    console.log(err.message);
    process.exit(1);
  }
};

// Read JSON file
const hotels = JSON.parse(
  fs.readFileSync(path.join(__dirname, "hotels.json"), "utf8"),
);

// Import data into database
const importDocuments = async () => {
  try {
    await Hotel.create(hotels);

    console.log("Script: Documents imported successfully");
  } catch (err) {
    console.log("Script: Error importing documents");
    console.log(err.message);
  }
};

// Delete all documents from database
const deleteDocuments = async () => {
  try {
    await Hotel.deleteMany();

    console.log("Script: Existing documents deleted");
  } catch (err) {
    console.log("Script: Error deleting documents");
    console.log(err.message);
  }
};

// Main function
const run = async () => {
  // Connect to DB first
  await connectDB();

  // Check terminal command
  if (process.argv[2] === "--import") {
    await importDocuments();
  } else if (process.argv[2] === "--delete") {
    await deleteDocuments();
  } else {
    console.log("Please use --import or --delete");
  }

  // Close database connection
  await mongoose.connection.close();

  // Exit script
  process.exit();
};

// Run script
run();
