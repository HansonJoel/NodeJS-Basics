const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "First Name is required"],
      validate: [validator.isAlpha, "First name can only contain letters"],
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      validate: [validator.isAlpha, "First name can only contain letters"],
    },
    email: {
      type: String,
      required: [true, "Please add an email address"],
      trim: true,
      lowercase: true,
      unique: [true, "A user with same email already exist"],
      validate: [validator.isEmail, "Email is not valid"],
    },
    photo: String,
    password: {
      type: String,
      required: [true, "Kindly enter your password"],
      minLength: 8,
    },
    confirmPassword: {
      type: String,
      required: [true, "Kindly confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

module.exports = mongoose.model("user", userSchema);
