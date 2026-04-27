const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.send("Welcome to my Express.js application!");
});

// Define a GET endpoint for /api/hotels

let hotels = JSON.parse(fs.readFileSync("./data/hotels.json", "utf8")); // Read the hotels data which is stored in javscript objects and converted it to JSON file

app.get("/api/v1/hotels", (req, res) => {
  res.status(200).json({
    status: "success",
    count: hotels.length,
    data: { hotels },
  });
});

// Defines a POST endpoint for /api/hotels to add a new hotel to the hotels array and save it to the hotels.json file
app.post("/api/v1/hotels", (req, res) => {
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
        data: {
          hotel: newHotel,
        },
      });
    }
  });
});

console.log("Hello Express.js!");
console.log("This is my first Express.js application.");

module.exports = app;
