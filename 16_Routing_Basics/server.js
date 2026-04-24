const app = require("./app");

const PORT = 3000;
const HOSTNAME = "localhost";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server currently running on http://${HOSTNAME}:${PORT}/`);
});
