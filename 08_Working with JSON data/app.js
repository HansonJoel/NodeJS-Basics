const http = require("http");
const fs = require("fs");
const HOSTNAME = "localhost";
const port = 8000;

// Create an HTTP server that listens for incoming requests and sends a response
const server = http.createServer((req, res) => {
  console.log("A new request received.....");
  if (req.url === "/" || req.url === "/home") {
    // Read the index.html file and send its content as the response
    fs.readFile("./index.html", "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error loading home.html");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
  } else if (req.url === "/Products") {
    // Read the products.json file and send its content as the response
    fs.readFile("./products.json", "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error loading products.json");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        let products = JSON.parse(data);
        res.end(JSON.stringify(products));
      }
    });
  } else if (req.url === "/contact.html") {
    // Read the contact.html file and send its content as the response
    fs.readFile("./contact.html", "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error loading contact.html");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
  } else {
    fs.readFile("./404.html", "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error loading 404.html");
      } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
  }
});

server.listen(port, HOSTNAME, () => {
  console.log(`Server started successully at http://${HOSTNAME}:${port}/`);
});
