const User = require("./../models/user");
const AppError = require("./../utilities/appError");
const catchAsync = require("./../utilities/catchAsync");
const signToken = require("./../utilities/signToken");
const filterObj = require("./../utilities/filterObject");

// Update user password
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get the details of currently logged in user
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    const error = new AppError("Cannot find the user", 404);
    return next(error);
  }

  // 2. Compare the current password of user with the saved password
  const isMatch = await user.comparePassword(req.body.currentPassword);

  if (!isMatch) {
    const error = new AppError("The provided password is wrong", 404);
    return next(error);
  }
  // 3. Update the user password with the new
  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordChangedAt = Date.now();

  await user.save();

  // 4. Login the user & send JWT in the response
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

// Update user details
exports.updateMe = catchAsync(async (req, res, next) => {
  // Don't allow password updates here
  if (req.body.password || req.body.confirmPassword) {
    const error = new AppError(
      "This route is not for password updates. Please use /updatePassword",
      400,
    );
    return next(error);
  }
  // 2. Update the user details. Allow only specified fields to be updated
  const userDetailsToUpdate = filterObj(req.body, "firstName", "lastName");

  // Check if there are any fields to update
  if (Object.keys(userDetailsToUpdate).length === 0) {
    return next(
      new AppError("Please provide at least one field to update.", 400),
    );
  }

  // 3. Update the user details in the database
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    userDetailsToUpdate,
    {
      new: true,
      runValidators: true,
    },
  );

  // 3. Send updated user data in the response
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// Delete user account (soft delete)
exports.deleteMe = catchAsync(async (req, res, next) => {
  // 1. Find the user by ID and set isActive to false
  const deletedUser = await User.findByIdAndUpdate(
    req.user._id,
    { isActive: false },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!deletedUser) {
    const error = new AppError("Cannot find the user", 404);
    return next(error);
  }

  // 2. Send the updated user data in the response
  res.status(204).json({
    status: "success",
    data: null,
  });
});
