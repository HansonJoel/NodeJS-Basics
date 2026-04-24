const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to my Express.js application!");
});

//
app.get("/contact", (req, res) => {
  res.status(200).send("This is the Contact Page");
});

app.get("/api/hotels", (req, res) => {
  res.status(200).json({
    status: "success",
    data: { hotels: ["Hotel A", "Hotel B", "Hotel C"] },
    message: "Hotels retrieved successfully",
  });
});

console.log("Hello Express.js!");
console.log("This is my first Express.js application.");

module.exports = app;
