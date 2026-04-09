const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your favourite programming Language? ", (language) => {
  console.log(language, "is a great choice!");
  rl.close();
});

rl.on("close", () => {
  process.exit(0);
});
