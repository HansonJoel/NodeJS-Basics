const fs = require("fs");

// We use a try/catch block to handle errors in synchronous code
try {
  fs.unlinkSync("./Files/output.txt");
  console.log("File deleted successfully!");
} catch (error) {
  console.log("Uh oh, the file doesn't exist or couldn't be deleted.");
}
