const express = require("express");
const hotelsController = require("./controller/hotelsController");

const app = express();

app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.send("Welcome to my Express.js application!");
});

// hotels routes
app.get("/api/v1/hotels", hotelsController.getAllHotels);
app.post("/api/v1/hotels", hotelsController.createHotel);
app.get("/api/v1/hotels/:id", hotelsController.getHotelByID);

module.exports = app;
