const mongoose = require("mongoose");

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
});

// Model
module.exports = mongoose.model("Hotel", hotelSchema);

// const hotel1 = new Hotel({
//   name: "Hotel California",
//   price: 5200,
//   city: "Los Angeles",
// });
// hotel1.save();
