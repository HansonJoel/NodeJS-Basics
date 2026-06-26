const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    passwordChangedAt: Date,
  },

  { timestamps: true },
);

userSchema.pre("save", async function () {
  // skip hashing if password is not modified
  if (!this.isModified("password")) return next();
  // hashing the password before saving it to the database

  this.password = await bcrypt.hash(this.password, 10); // using the salt 10
  this.confirmPassword = undefined;
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// userSchema.methods.isPasswordChanged = function (tokenIssuedAt) {
//   if (this.passwordChangedAt) {
//     const passwordChangedAtInSeconds = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10,
//     );
//     return passwordChangedAtInSeconds > tokenIssuedAt;
//   }
//   return false;
// };

module.exports = mongoose.model("user", userSchema);
