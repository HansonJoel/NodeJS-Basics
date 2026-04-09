const fs = require("fs");

// write string into a new file called backup.txt.
let text = `important file system backup data \nDate created ${new Date()}`;
try {
  fs.writeFileSync("./backup.txt", text);
} catch (error) {
  console.log("Uh oh, the file doesn't exist or couldn't be read.");
}

// read backup.txt and console.log its contents to the screen to
try {
  let content = fs.readFileSync("./backup.txt", "utf-8");
  console.log(content);
} catch {
  console.log("Uh oh, the file doesn't exist or couldn't be read.");
}
