const fs = require("fs");
const { get } = require("http");
const { parse } = require("path");

let hotels = JSON.parse(fs.readFileSync("./data/hotels.json", "utf8")); // Read the hotels data which is stored in javscript objects and converted it to JSON file

// Middleware function to check if a hotel with the specified ID exists
const checkHotelExist = (req, res, next, value) => {
  const hotelIndex = hotels.findIndex((h) => h.id === +value); // Find the index of the hotel with the matching value

  if (hotelIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: `Hotel with the specified ID ${value} is not found`,
    });
  }
  next();
};

// Middleware function to validate the request body for creating a new hotel
const validatePostBody = (req, res, next) => {
  const body = req.body;

  // IF the body itself is missing OR any of the required fields are missing
  if (
    !body ||
    !body.name ||
    !body.type ||
    !body.rating ||
    !body.city ||
    !body.country ||
    !body.price
  ) {
    // STOP the request and return the error
    return res.status(400).json({
      status: "error",
      message: "Invalid hotel data provided. Missing required fields.",
    });
  }

  // If we make it down here, all the required fields exist! Let them through.
  next();
};
// Controller function to get all hotels
const getAll = (req, res) => {
  res.status(200).json({
    status: "success",
    count: hotels.length,
    requestedTime: req.requestedTime,
    data: { hotels },
  });
};

// Controller function to create a new hotel
const create = (req, res) => {
  const newId = hotels[hotels.length - 1].id + 1; // Generate a new ID for the hotel
  const newHotel = { id: newId, ...req.body }; // Create a new hotel object with the generated ID and the data from the request body
  hotels.push(newHotel); // Add the new hotel to the hotels array

  fs.writeFile("./data/hotels.json", JSON.stringify(hotels), "utf8", (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "Failed to save hotel data",
      });
    } else {
      res.status(201).json({
        status: "success",
        createdTime: req.requestedTime,
        data: {
          hotel: newHotel,
        },
      });
    }
  });
};

// Controller function to get a hotel by ID
const getByID = (req, res) => {
  // Extract the hotel ID from the request parameters
  const id = parseInt(req.params.id); // Convert the ID from string to integer
  const hotel = hotels.find((h) => h.id === id); // Find the hotel with the matching ID

  res.status(200).json({
    status: "success",
    requestedTime: req.requestedTime,
    data: {
      hotel,
    },
  });
};

// Controller function to update a hotel by ID
const update = (req, res) => {
  console.log(req.body);

  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Request body is missing or invalid JSON",
    });
  }

  const id = parseInt(req.params.id); // Convert the ID from string to integer
  const hotelIndex = hotels.findIndex((h) => h.id === id); // Find the index of the hotel with the matching ID

  // Update the hotel data
  const { id: bodyId, ...updateData } = req.body; //

  // Merge the existing hotel data with the updated data
  hotels[hotelIndex] = { ...hotels[hotelIndex], ...updateData };

  // Save the updated hotels data to the JSON file
  fs.writeFile("./data/hotels.json", JSON.stringify(hotels), "utf8", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: "error",
        message: "Failed to update hotel data",
      });
    } else {
      res.status(200).json({
        status: "success",
        updatedTime: req.requestedTime,
        data: {
          hotel: hotels[hotelIndex],
        },
      });
    }
  });
};

// Controller function to delete a hotel by ID
const deleteHotel = (req, res) => {
  const id = parseInt(req.params.id); // Convert the ID from string to integer
  const hotelIndex = hotels.findIndex((h) => h.id === id); // Find the index of the hotel with the matching ID

  // Remove the hotel from the hotels array
  hotels.splice(hotelIndex, 1);

  // Save the updated hotels data to the JSON file
  fs.writeFile("./data/hotels.json", JSON.stringify(hotels), "utf8", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: "error",
        message: "Failed to delete hotel data",
      });
    } else {
      res.status(200).json({
        status: "success",
        deletedTime: req.requestedTime,
        message: `Hotel with ID ${id} has been deleted`,
      });
    }
  });
};

module.exports = {
  checkHotelExist,
  validatePostBody,
  getAll,
  create,
  getByID,
  update,
  deleteHotel,
};
