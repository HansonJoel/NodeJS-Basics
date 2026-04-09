const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the name of the new Event guest: ", (name) => {
  let guestName = name;

  try {
    fs.writeFileSync("./guestlist.txt", guestName);
    console.log(`${guestName} entered Successfully`);
    rl.close();
  } catch (error) {
    console.log("Uh oh, there was an error entering guest name.");
    rl.close();
  }
});

rl.on("close", () => {
  process.exit(0);
});
