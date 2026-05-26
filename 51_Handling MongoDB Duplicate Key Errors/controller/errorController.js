const AppError = require("../utilities/appError");

// Global Error Handler
const devError = (res, error) => {
  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message,
    stack: error.stack,
    error: error,
  });
};

const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    console.error("ERROR", error);

    res.status(error.statusCode || 500).json({
      status: "error",
      message: "Something went wrong. Please try again later.",
    });
  }
};

const handleCastError = (error) => {
  const errorMessage = `Invalid value '${error.value}' for property '${error.path}'.`;
  const appError = new AppError(errorMessage, 400);
  return appError;
};

const duplicateKeyHandler = (error) => {
  const field = Object.keys(error.keyValue)[0];

  const value = error.keyValue[field];

  const errorMessage = `A document with field '${field}' and value '${value}' already exists`;

  return new AppError(errorMessage, 409);
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devError(res, error);
  } else {
    let appError = { ...error };

    appError.message = error.message;

    if (error.name === "CastError") {
      appError = handleCastError(error);
    }
    if (error.code === 11000) {
      appError = duplicateKeyHandler(error);
    }

    prodErrors(res, appError);
  }
};
