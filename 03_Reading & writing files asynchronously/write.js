const fs = require("fs");

let content = `Topic: How Read and write files Asynchronously in Node.JS ${new Date()}`;

fs.writeFile("./input.txt", content, (error) => {
  if (error) {
    console.log("Uh oh, couldn't write the file!");
    return;
  } else {
    console.log("Files written successfully");
  }
});

console.log("Writing Files....");
