const http = require("http");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./readme.txt");

// Add 'utf8' encoding so that the data is read as text
let myReadStream = fs.createReadStream(filePath, { encoding: "utf8" });

myReadStream.on("data", function (chunk) {
  console.log("New chuck received");
  console.log(chunk);
});
