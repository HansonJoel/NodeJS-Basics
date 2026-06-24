const express = require("express");
const authController = require("./../controller/authController");
const authRouter = express.Router();

authRouter.route("/signup").post(authController.signUp);

module.exports = authRouter;
