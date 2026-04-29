# 🧩 Understanding Middleware in Express.js

This section covers what I learned about **middleware** in Express and how it works in my application.

---

## 🚀 What is Middleware?

Middleware is a function that runs **between the request and the response**.

```text
Request → Middleware → Middleware → Route → Response
```

It can:

- Modify the request (req)
- Modify the response (res)
- Execute code (e.g., logging)
- Pass control using next()

🔑 Important Concepts
✔ next() is required
next();
Passes control to the next middleware
Without it → request hangs ❌
✔ Middleware can modify req
req.requestedTime = ...

👉 This value is available in all subsequent middleware and routes

✔ app.use() applies middleware globally
app.use(logger);

👉 Runs for every request

⚠️ Common Mistakes
Forgetting next() → request never completes ❌
Wrong middleware order → unexpected behavior ❌
Not parsing body → req.body becomes undefined ❌

🧩 Summary
Middleware is the backbone of Express apps
It runs before routes
It helps with:
Logging
Parsing data
Modifying requests
Execution is always top → bottom
