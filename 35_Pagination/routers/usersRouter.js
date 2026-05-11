const express = require("express");
const usersRouter = express.Router();


// usersRouter.param("name", paramMiddleware);

usersRouter.param('id',(req, res, next, value) => {
    console.log("id Route Paramenter Value: " + value);
    next();
  });

usersRouter.get("/", (req, res) => {
  res.send(`Sending all users`);
});


usersRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Sending user with ID: ${userId}`);
});

module.exports = usersRouter;
