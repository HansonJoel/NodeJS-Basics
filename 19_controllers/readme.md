# 🚀 Node.js + Express: Using Controllers

This project demonstrates how to structure an Express.js application using **controllers** to handle route logic, improving code organization and scalability.

---

## 📚 What I Learned

- How to separate route logic into **controller functions**
- How to organize code using a **modular structure**
- How to use `module.exports` to share functions across files
- How to handle `GET` and `POST` requests using controllers
- How to read and write JSON data using the `fs` module
- How to use `express.json()` middleware to handle request bodies

---

## 🧠 Key Concept: Controllers

Instead of writing all logic inside `app.js`, we move it into a separate file: `hotelsController.js`

This keeps our code:

- Cleaner
- Easier to maintain
- Scalable for larger applications

---

🛠️ Next Steps

- Add GET /api/v1/hotels/:id
- Add PATCH and DELETE routes
- Implement validation for incoming data
- Move to a real database
