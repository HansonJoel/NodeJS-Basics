# 🚀 First Node.js Project: Terminal I/O

This repository contains my practice code from the **[First Node JS Project tutorial](https://www.youtube.com/watch?v=VP55JN3y6uI)** by Procademy. I am following the complete Node.js playlist to strengthen my knowledge and build a solid foundation in backend development.

## 💡 About This Lesson

This lesson focuses on the absolute basics of interacting with the terminal using Node.js, specifically handling input and output operations without a browser environment.

## 🧠 Key Learnings

### Outputting Information

We can use the standard `console.log()` command to easily output information directly to the terminal.

### Reading Information

> **Note:** Unlike the browser environment, Node.js _does not_ have a simple, built-in global function to read values directly from the terminal.

To solve this, we must import and use the built-in **`readline` module** provided by Node.js. By creating an interface connected to the standard input (`process.stdin`) and output (`process.stdout`), we can prompt the user with questions and successfully capture their keyboard responses.

🔗 Resources
Tutorial Video: Procademy - #04 First Node JS Project

Playlist: Fundamentals of NODE JS
