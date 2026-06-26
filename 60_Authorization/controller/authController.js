const dotenv = require("dotenv");
dotenv.config();
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const AppError = require("./../utilities/appError");

// Generating a JWT token for user
const signToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: "Joel Hanson", // Optional: specify the issuer of the token
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  // Generating a JWT token for the newly created user
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // check if email/password provided
  if (!email || email === "") {
    const error = new AppError("Email is not Provided", 400);
    return next(error);
  }

  if (!password || password === "") {
    const error = new AppError("Password is not Provided", 400);
    return next(error);
  }

  // check if credentials exist in the database
  const user = await User.findOne({ email: email }).select("+password"); // check if email exist

  if (!user) {
    const error = new AppError("User with given email is not found", 400);
    return next(error);
  }

  // if the password matches the saved password
  // const isMatch = await user.comparePassword(password, user.password);
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    const error = new AppError("Password is not correct", 401);
    return next(error);
  }

  // Generate a token
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token: token,
    // data: {
    //   user,
    // },
  });
});

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  // 1. Read access token from the request header
  const testToken = req.headers.Authorization || req.headers.authorization;
  let token = null;

  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  } else {
    const error = new AppError(
      "You are not logged in. Please log in to get access.",
      401,
    );
    return next(error);
  }

  if (!token) {
    const error = new AppError("You are not logged in", 401);
    return next(error);
  }

  // 2. Verify if the token is valid and not expired
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded Token:", decodedToken);

  // 3. if token is valid, check if the user still exists in the database
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    const error = new AppError("User does not exist. Access denied", 401);
    return next(error);
  }

  // 4. check if the user's password was changed after the token was issued

  next();
});
