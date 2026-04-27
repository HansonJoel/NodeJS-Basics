# 🚀 Node.js + Express: Handling POST Requests

This project demonstrates how to create a **POST API endpoint** using Express.js to add new data and persist it in a JSON file.

---

## 📚 What I Learned

- How to create a `POST` route in Express
- How to access client data using `req.body`
- How to use the **spread operator (`...`)** to merge objects
- How to generate a unique ID for new data
- How to write data to a file using `fs.writeFile`
- How to send proper HTTP responses (`201`, `500`)
- Difference between **JavaScript objects** and **JSON**

## ⚙️ How It Works

1. Client sends a `POST` request with hotel data

2. Server:
   - Generates a new ID
   - Combines ID with request data
   - Adds it to the existing array
   - Saves updated data to `hotels.json`

3. Server responds with:
   - `201 Created` (success)
   - or `500 Internal Server Error` (failure)

---

## 🔑 Important Concepts

- `req.body` → incoming data from client
- `...req.body` → spreads properties into a new object
- `JSON.stringify()` → converts JS object to JSON for storage
- `fs.writeFile()` → saves data to file

**HTTP Status Codes:**

- `201` → Created
- `500` → Server Error

---

## ⚠️ Note

This method is great for learning, but in real-world applications:

- File storage is not efficient for large-scale apps
- Databases (e.g. MongoDB, PostgreSQL) are preferred

---

## 🛠️ Next Steps

- Implement `GET`, `PATCH`, and `DELETE` routes (CRUD)
- Add validation for incoming data
- Learn how to use a database instead of JSON files

---

## ✍️ Author

Learning Node.js step-by-step 🚀
