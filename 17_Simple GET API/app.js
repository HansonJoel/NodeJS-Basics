const express = require("express");
const fs = require("fs");
const app = express();

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

console.log("Hello Express.js!");
console.log("This is my first Express.js application.");

module.exports = app;
