const http = require("http");
const fs = require("fs");
const HOSTNAME = "localhost";
const port = 8000;

// 1. Read files synchronously ONCE at the top
let html = fs.readFileSync("./index.html", "utf-8");
let productlist = fs.readFileSync("./product-list.html", "utf-8");
let products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

// 2. Transform the JSON data into an Array of HTML snippets
let productHTMLArray = products.map((product) => {
  let productItem = productlist
    // The replace tags MUST match your product-list.html perfectly
    // The product properties MUST match your products.json perfectly
    .replace("{{%IMAGE%}}", product.productImage)
    .replace("{{%NAME%}}", product.name)
    .replace("{{%MODELNAME%}}", product.modeName)
    .replace("{{%MODELNO%}}", product.modelNumber)
    .replace("{{%SIZE%}}", product.size)
    .replace("{{%CAMERA%}}", product.camera)
    .replace("{{%PRICE%}}", product.price)
    .replace("{{%COLOR%}}", product.color)
    .replace("{{%ID%}}", product.id);

  return productItem;
});

// 3. Join the Array into one giant HTML String
let productHTML = productHTMLArray.join("");

// Create an HTTP server
const server = http.createServer((req, res) => {
  console.log("A new request received: ", req.url);

  // --- HOME PAGE ROUTE ---
  if (req.url === "/" || req.url === "/home") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    // Inject the generated product HTML into the main index.html template!
    let finalHTML = html.replace("{{%CONTENT%}}", productHTML);

    res.end(finalHTML);
  }

  // --- PRODUCTS JSON ROUTE ---
  else if (req.url === "/Products") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(products));
  }

  // --- CONTACT ROUTE ---
  else if (req.url === "/contact.html") {
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
  }

  // --- 404 ROUTE ---
  else {
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
  console.log(`Server started successfully at http://${HOSTNAME}:${port}/`);
});
