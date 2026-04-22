const http = require("http");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "./readme.txt");

// Create server
const server = http.createServer();

// Listen for request event
server.on("request", (req, res) => {
  let myReadStream = fs.createReadStream(filePath);

  myReadStream.on("data", function (chunk) {
    console.log("New chuck received");
    res.write(chunk); // this is how we send data to the client in chunks. We write the chunk to the response stream.
  });

  myReadStream.on("end", () => {
    res.end();
  });
});

// Start server
server.listen(8000, "localhost", () => {
  console.log("Server is listening on port 8000");
});
