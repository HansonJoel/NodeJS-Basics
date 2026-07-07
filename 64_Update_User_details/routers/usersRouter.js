const express = require("express");
const usersRouter = express.Router();
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");

usersRouter
  .route("/updatePassword")
  .patch(authController.isAuthenticated, userController.updatePassword);

usersRouter
  .route("/updateMe")
  .patch(authController.isAuthenticated, userController.updateMe);

module.exports = usersRouter;
