const app = require("./app");

const PORT = 3000;
const HOSTNAME = "localhost";

app.get("/", (req, res) => {
  res.send("Welcome to my Express.js application!");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
