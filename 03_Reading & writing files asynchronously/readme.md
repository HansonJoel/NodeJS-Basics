# 📁 Node.js File System (Async) Practice

## 🚀 Overview

Today, I learned how to work with the **File System (`fs`) module in Node.js**, focusing on **asynchronous file operations**.

This includes:

- Writing files asynchronously
- Reading files asynchronously
- Combining both operations

---

## 📚 What I Learned

### 📝 1. Writing Files Asynchronously

Using `fs.writeFile()` to create and write content to a file without blocking the main thread.

Key Takeaways:
Non-blocking (asynchronous) operation
Uses a callback to handle success or error
Creates the file if it doesn’t exist

📖 2. Reading Files Asynchronously

Using fs.readFile() to read file content.

Key Takeaways:
Reads file without blocking execution
Requires encoding (utf-8) for readable text
Returns file content via callback

🔄 3. Combining Read & Write Operations

Writing to a file and then reading it inside the callback.

Key Takeaways:
Demonstrates callback chaining
Ensures file is written before reading
Shows how asynchronous flow works in Node.js

⚡ Important Concept
🧠 Asynchronous Execution

Node.js does not wait for file operations to finish before moving to the next line of code.

📌 Conclusion

This practice helped me understand:

How Node.js handles non-blocking I/O
How to work with callbacks
The importance of execution order in asynchronous programming

💻 Author
Joel Hanson
