# 🛒 Node.js Product Listing Server

This is a simple Node.js project that serves a dynamic product listing page using core Node.js modules (`http` and `fs`) without any frameworks like Express.

---

## 🚀 Features

- Creates a basic HTTP server using Node.js
- Reads and serves HTML files
- Loads product data from a JSON file
- Dynamically injects product data into HTML templates
- Serves different routes:
  - Home page (`/`)
  - Products API (`/Products`)
  - Contact page (`/contact.html`)
  - Custom 404 page

---

## 🧠 How It Works

1. The server reads HTML templates and product data from files.
2. JSON data is parsed into JavaScript objects.
3. Each product is converted into an HTML snippet using `.map()` and `.replace()`.
4. All product HTML is combined using `.join("")`.
5. The final HTML is injected into the main `index.html` template.
6. The server responds based on the requested URL.

---

📌 Learning Purpose

This project helps understand:

How Node.js servers work internally
File reading and writing
Basic routing without Express
Template rendering using string replacement
JSON handling in Node.js


👨‍💻 Author
Built as a learning project to understand backend fundamentals using Node.js.
