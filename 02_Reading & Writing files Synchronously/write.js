const fs = require("fs");

let content = `Data written into the output.txt file \nDate created ${new Date()}`;
fs.writeFileSync("./Files/output.txt", content);
