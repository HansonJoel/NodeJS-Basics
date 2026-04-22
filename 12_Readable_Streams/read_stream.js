const http = require("http");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./readme.txt");

let myReadStream = fs.createReadStream(filePath);

myReadStream.on("data", function (chunk) {
  console.log("New chuck received");
  console.log(chunk);
});
