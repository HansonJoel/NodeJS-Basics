const http = require("http"); 
const fs = require("fs");
const path = require("path");


const readPath = path.join(__dirname, "./readme.txt");
const writePath = path.join(__dirname, './writeMe.txt');


// Add 'utf8' encoding so that the data is read as text
const myReadStream = fs.createReadStream(readPath, { encoding: "utf8" });
const myWriteStream = fs.createWriteStream(writePath, { encoding: "utf8" })

myReadStream.on("data", function (chunk) {
  console.log("New chuck received");
  myWriteStream.write(chunk);
});
