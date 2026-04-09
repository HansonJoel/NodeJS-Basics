const fs = require("fs");

try {
  let readMe = fs.readFileSync("./Files/input.txt", "UTF-8");
  console.log(readMe);
} catch (error) {
  console.log("Uh oh, the file doesn't exist or couldn't be read.");
}
