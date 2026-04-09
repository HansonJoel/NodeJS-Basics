const fs = require("fs");

/*This is a synronous way of opening a file.
Opening a file will just return the file detector
*/
try {
  const open = fs.openSync("./Files/input.txt", "r");
  console.log(open);
} catch (error) {
  console.log("Uh oh, the file doesn't exist or couldn't be opened.");
}
