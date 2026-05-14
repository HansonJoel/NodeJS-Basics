const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Hotel Schema
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hotel name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Hotel description is required"],
    trim: true,
  },
  type: {
    // hotel type (e.g., "Hotel", "Resort", "Apartment", "Villa", "Cabin")
    type: String,
    required: [true, "Hotel type is required"],
    trim: true,
  },

  price: {
    type: Number,
    required: [true, "Hotel price is required"],
    min: [100, "Hotel price must be at least 100"],
    max: [10000, "Hotel price must be less than 10000"],
  },
  category: {
    type: [String],
    required: true,
  },
  city: {
    type: String,
    required: [true, "Hotel city is required"],
  },
  address: {
    type: String,
    required: [true, "Hotel address is required"],
    trim: true,
  },
  distance: {
    type: Number,
    required: [true, "Hotel distance from Airportis required"],
    trim: true,
  },
  images: {
    type: [String],
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: [true, "Hotel cheapest price is required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdBy: String,
});

// pre-hook
// works only when using the .save(), or .create() method
// Does not work for insertOne(), insertMany()

// you can have as many hooks as you want
hotelSchema.pre("save", async function () {
  this.createdBy = "Joel Hanson";
});

hotelSchema.pre("save", async function () {
  if (this.cheapestPrice < 100) {
    throw new Error("Price of a Hotel cannot be less than 100");
  }
});

// post-hook
hotelSchema.post("save", function (doc, next) {
  const content = `${new Date()}: A new Hotel document with name ${doc.name} was created by ${doc.createdBy}\n`;

  const logPath = path.join(__dirname, "../logs/log.txt");
  fs.writeFile(logPath, content, { flag: "a" }, (error) => {
    if (error) {
      console.log(error.message);
    }
  });
  next();
});

// Model
module.exports = mongoose.model("Hotel", hotelSchema);

// const hotel1 = new Hotel({
//   name: "Hotel California",
//   price: 5200,
//   city: "Los Angeles",
// });
// hotel1.save();
