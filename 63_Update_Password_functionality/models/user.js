const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
      select: false,
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
    role: {
      type: String,
      enum: ["user", "admin", "super"],
      default: "user",
    },
    passwordChangedAt: Date,
    resetToken: String,
    resetTokenExpiresAt: Date,
  },
  { timestamps: true },
);

// Hashing the password before saving it to the database
userSchema.pre("save", async function () {
  // skip hashing if password is not modified
  if (!this.isModified("password")) return;
  // hashing the password before saving it to the database

  this.password = await bcrypt.hash(this.password, 10); // using the salt 10
  this.confirmPassword = undefined;
});

// Compare the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if the password was changed after the token was issued
userSchema.methods.isPasswordChanged = async function (tokenIssuedAt) {
  if (this.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      // returns the time stamp in seconds when the password was changed
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return tokenIssuedAt < passwordChangedTimestamp;
  }
  return false;
};

userSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetTokenExpiresAt = Date.now() + 10 * 60 * 1000;

  console.log(resetToken, this.resetToken);

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
