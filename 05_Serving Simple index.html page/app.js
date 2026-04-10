const http = require("http");
const fs = require("fs");
const HOSTNAME = "localhost";
const port = 8000;

// Create an HTTP server that listens for incoming requests and sends a response
const server = http.createServer((request, response) => {
  console.log("A new request received.....");

  // Read the index.html file and send its content as the response
  fs.readFile("./template/index.html", "utf-8", (err, data) => {
    if (err) {
      response.statusCode = 500;
      response.end("Error loading index.html");
    } else {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.end(data);
    }
  });
});

server.listen(port, HOSTNAME, () => {
  console.log(`Server started successully at http://${HOSTNAME}:${port}/`);
});
