const http = require("http");
const fs = require("fs");
const url = require("url");

const HOSTNAME = "localhost";
const port = 8000;

// 1. Read files synchronously ONCE at the top
let indexPage = fs.readFileSync("./index.html", "utf-8");
let productsPage = fs.readFileSync("./products.html", "utf-8");
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

  // 4. Parse the URL to get pathname and query
  let { pathname, query } = url.parse(req.url, true);
  // console.log("Pathname: ", pathname);
  // console.log("Query: ", query);

  // --- HOME PAGE ROUTE ---
  if (pathname === "/" || pathname === "/home") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(indexPage);
  }

  // --- PRODUCTS JSON ROUTE ---
  else if (pathname === "/products" || pathname === "/products.html") {
    // If NO query → show all products
    if (!query.id) {
      let finalPage = productsPage.replace("{{%CONTENT%}}", productHTML);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(finalPage);
    }

    // If query exists → show SINGLE product
    else {
      const product = products.find((p) => p.id === Number(query.id));

      if (!product) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("<h1>Product not found</h1>");
      }
      let singleProductHTML = productlist
        .replace("{{%IMAGE%}}", product.productImage)
        .replace("{{%NAME%}}", product.name)
        .replace("{{%MODELNAME%}}", product.modeName)
        .replace("{{%MODELNO%}}", product.modelNumber)
        .replace("{{%SIZE%}}", product.size)
        .replace("{{%CAMERA%}}", product.camera)
        .replace("{{%PRICE%}}", product.price)
        .replace("{{%COLOR%}}", product.color)
        .replace("{{%ID%}}", product.id);

      let finalPage = productsPage.replace("{{%CONTENT%}}", singleProductHTML);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(finalPage);
    }
  }

  // --- CONTACT ROUTE ---
  else if (pathname === "/contact.html") {
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
