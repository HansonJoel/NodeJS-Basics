const User = require("./../models/user");
const AppError = require("./../utilities/appError");
const catchAsync = require("./../utilities/catchAsync");
const signToken = require("./../utilities/signToken");

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
