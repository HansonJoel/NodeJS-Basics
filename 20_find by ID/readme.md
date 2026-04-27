# 🚀 Node.js + Express: Get Hotel by ID (Dynamic Routes)

This project demonstrates how to retrieve a **single resource** using a dynamic route parameter in Express.js.

---

## 📚 What I Learned

- How to create **dynamic routes** using `:id`
- How to access route parameters using `req.params`
- How to convert string parameters to numbers using `parseInt()`
- How to find data in an array using `.find()`
- How to handle cases where data is not found (`404`)
- Importance of **case sensitivity** in JavaScript

---

## 📁 Key Concept: Dynamic Routing

```js
app.get("/api/v1/hotels/:id", hotelsController.getHotelByID);
```

:id is a route parameter
It allows us to fetch a specific hotel by its ID

## 🔄 How It Works

1. Client sends a request:
   GET /api/v1/hotels/3

2. Server:

- Extracts `id` from the URL (`req.params.id`)
- Converts it to a number
- Searches the `hotels` array
- Returns the matching hotel

3. Response:

- `200 OK` → if hotel is found
- `404 Not Found` → if hotel does not exist

---

## 🔑 Important Concepts

- `req.params` → contains route parameters
- `parseInt()` → converts string to number
- `.find()` → returns the first matching element
- `404` → resource not found
- `200` → successful request

🛠️ Next Steps
. Add validation for invalid IDs
. Implement PATCH (update hotel)
. Implement DELETE (remove hotel)
. Move from JSON file to a real database

✍️ Author

Learning Node.js step-by-step 🚀
