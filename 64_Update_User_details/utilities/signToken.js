const jwt = require("jsonwebtoken");

// Generating a JWT token for user
const signToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
    issuer: "Joel Hanson", // Optional: specify the issuer of the token
  });
};

module.exports = signToken;
