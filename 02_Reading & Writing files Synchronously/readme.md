# 📁 Node.js Basics: Synchronous File System Operations

This repository contains my practice code for learning how to interact with the file system using Node.js. In this section, I explored the built-in `fs` (File System) module, specifically focusing on **synchronous** methods.

## 💡 About This Lesson

This lesson focuses on how to read, write, open, and delete files directly from the hard drive using the Node.js `fs` module.

Because the methods used here are **synchronous** (meaning they block the execution of the rest of the program until the hard drive finishes the task), it is crucial to wrap them in `try/catch` blocks. This ensures that if something goes wrong—like trying to read a file that doesn't exist—the program can handle the error gracefully instead of completely crashing.

## 🧠 Key Learnings

- **Reading Files:** Using `fs.readFileSync()` to retrieve and decode text data from a file.
- **Writing Files:** Using `fs.writeFileSync()` to create a new file or overwrite an existing one with new data.
- **Opening Files:** Using `fs.openSync()` to interact with a file and return its "file descriptor" (a numerical reference to the file).
- **Deleting Files:** Using `fs.unlinkSync()` to permanently remove a file from the system.
- **Error Handling:** Implementing `try/catch` blocks for safe synchronous execution.
