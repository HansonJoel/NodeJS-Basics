🚀 Express Router Refactor (Hotels API)

This update demonstrates how to **separate routes into a dedicated router file** using `express.Router()` for better structure and scalability.

---

## 📚 What I Learned

- How to create and use **Express Router**
- How to move route definitions out of `app.js`
- How to **group related endpoints** in one place
- How to use **route chaining** (`.route()`)
- How to mount routes using `app.use()`

---

## 📁 Project Structure (Relevant Parts)

project-root/
│
├── controller/
│ └── hotelsController.js
│
├── routers/
│ └── hotelsRouter.js #All hotel routes here
│
├── app.js # App setup + route mounting
├── server.js

🧠 Why This Approach?
✅ Cleaner code (no clutter in app.js)
✅ Easier to scale (add more routers like users, bookings)
✅ Better organization (routes, controllers separated)
✅ Follows real-world backend structure

✍️ Author

Learning Node.js step-by-step 🚀
