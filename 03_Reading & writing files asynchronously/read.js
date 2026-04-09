const fs = require("fs");

fs.readFile("./input.txt", "utf-8", (error1, data1) => {
  if (error1) {
    console.log("Uh Oh, couldn't read the file", error1);
    return;
  } else {
    console.log(data1);
  }
});

console.log("Reading Files....");
