const http = require("http");
const fs = require("fs");
const HOSTNAME = "localhost";
const port = 8000;

// Create an HTTP server that listens for incoming requests and sends a response
const server = http.createServer((request, response) => {
  console.log("A new request received.....");

  response.writeHead(200, { "Content-Type": "application/json" });
  const data = {
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
  };
  response.end(JSON.stringify(data));
});

server.listen(port, HOSTNAME, () => {
  console.log(`Server started successully at http://${HOSTNAME}:${port}/`);
});
