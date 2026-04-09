const fs = require("fs");

let content = `Topic: How Read and write files Asynchronously in Node.JS ${new Date()}`;

// writing the content
fs.writeFile("./input.txt", content, (error) => {
  if (error) {
    console.log("Uh oh, couldn't write the file!");
    return;
  } else {
    console.log("Files written successfully");
  }

  // reading the content
  fs.readFile("./input.txt", "utf-8", (error, data) => {
    if (error) {
      console.log("Uh oh, couldn't read the file!");
      return;
    } else {
      console.log(data);
    }
  });
});

console.log("Writting Files....");
