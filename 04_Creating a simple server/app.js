const http = require("http");
const HOSTNAME = "localhost";
const port = 8000;

const server = http.createServer((request, response) => {
  response.end("Hello From the Server");
  console.log("A new request received");
});

server.listen(port, HOSTNAME, () => {
  console.log(`Server started successully at http://${HOSTNAME}:${port}/`);
});
