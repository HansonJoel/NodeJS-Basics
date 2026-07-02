const dotenv = require("dotenv");
dotenv.config();
const catchAsync = require("../utilities/catchAsync");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const AppError = require("../utilities/appError");
const sendEmail = require("../utilities/email");
const crypto = require("crypto");

// Generating a JWT token for user
const signToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: "Joel Hanson", // Optional: specify the issuer of the token
  });
};

// User Signup
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  // Generating a JWT token for the newly created user
  const token = signToken(newUser._id);

  newUser.password = undefined; // remove password from the response

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

// User Login
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
    const error = new AppError("User with given email is not found", 404);
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

// Middleware to protect routes and ensure user is authenticated
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
  // console.log("Decoded Token:", decodedToken);

  // 3. if token is valid, check if the user still exists in the database
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    const error = new AppError("User does not exist. Access denied", 401);
    return next(error);
  }

  // 4. check if the user's password was changed after the token was issued
  const passwordWasChanged = await user.isPasswordChanged(decodedToken.iat);

  if (passwordWasChanged) {
    const error = new AppError("Password was changed. Please login again", 401);
    return next(error);
  }

  // 5. Every check is successful, allow accesss to protected route
  req.user = user;

  next();
});

// role-based authorization middleware
exports.isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  };
};

// forgot password functionality
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // find the user based on the provided email
  const email = req.body.email;
  const user = await User.findOne({ email: email });

  if (!user) {
    const error = new AppError(
      "Cannot find the user with the provided email",
      404,
    );
    return next(error);
  }

  // Generate a token
  const plainResetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  // send an email to the user with password reset link
  const resetTokenLink = `${req.protocol}://${req.get("host")}/api/v1/auth/resetPassword/${plainResetToken}`;
  const emailBody = `We have received a request to reset your password. Please click on the following link to reset your password:\n\n ${resetTokenLink}. \n\nThis link will expire in 10 minutes. If you did not request a password reset, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Instructions",
      message: emailBody,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset link has been sent to user email",
    });
  } catch (error) {
    // Revert the token generation if email fails
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    const err = new AppError(
      "Failed to send password reset email. Please try again later.",
      500,
    );
    return next(err);
  }
});

// reset password functionality
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Hash the token from the request parameters
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // find the user with the hashed token and check if the token is not expired
  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiresAt: { $gt: Date.now() },
  });
  console.log("User found for reset:", user);

  if (!user) {
    const error = new AppError("Invalid or expired password reset token", 400);
    return next(error);
  }

  // Update the user's password and clear the reset token fields
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetToken = undefined;
  user.resetTokenExpiresAt = undefined;
  user.passwordChangedAt = Date.now();

  await user.save();

  // Generate a token and automatically log the user in after password reset
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token: token,
  });
});
