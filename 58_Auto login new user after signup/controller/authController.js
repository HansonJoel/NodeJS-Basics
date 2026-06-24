const dotenv = require("dotenv");
dotenv.config();
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  // Generating a JWT token for the newly created user
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: "Joel Hanson", // Optional: specify the issuer of the token
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});
