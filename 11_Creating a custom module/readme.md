# 🚀 Node.js Dynamic Server & Custom Template Engine

This repository contains a vanilla Node.js application built from scratch to understand the core mechanics of backend web development. It demonstrates how to handle HTTP requests, implement custom routing, and dynamically render HTML using a custom Server-Side Rendering (SSR) template engine.

## 🎯 Project Overview

Instead of relying on heavy frameworks like Express.js or React, this project uses Node.js's built-in `http`, `fs`, and `url` modules to manually process incoming requests. The server reads a JSON database, merges the data into HTML blueprints, and serves fully assembled, dynamic web pages to the browser.

## 🧠 Key Concepts Learned

- **Core Node.js Server Setup:** Created a server using `http.createServer()` to listen for and respond to incoming browser requests.
- **Custom Routing Logic:** Built an `if/else` routing system to serve different pages (`/`, `/products`, `/contact.html`, and a fallback `404.html`) based on the parsed URL pathname.
- **Server-Side Rendering (SSR):** Created a custom template engine from scratch. The server reads an HTML "blueprint" file, maps over a `products.json` array, and uses `.replace()` chaining to inject dynamic data before sending the finished HTML to the client.
- **URL Parsing & Query Strings:** Used `url.parse(req.url, true)` to extract query parameters (e.g., `?id=2`) to dynamically filter and display individual product pages.
- **Routing Best Practices:** \* Handled URL case-sensitivity by standardizing parsed pathnames.
  - Implemented "clean URLs" (supporting `/products` alongside `/products.html`) to prevent 404 errors.

## 📂 Project Structure

- `app.js` — The core Node.js server, router, and templating logic.
- `products.json` — The raw data (The "Database") containing the product details.
- `index.html` — The main layout/shell for the homepage.
- `products.html` — The main layout/shell for the products page containing a `{{%CONTENT%}}` placeholder.
- `product-list.html` — The reusable HTML component/blueprint for an individual product card.
- `contact.html` — A static informational page.
- `404.html` — The fallback error page for invalid routes.

## 💻 How to Run

1. Clone this repository to your local machine.
2. Ensure [Node.js](https://nodejs.org/) is installed.
3. Open your terminal and navigate to the project directory.
4. Start the server by running:
   ```bash
   node app.js
   ```
