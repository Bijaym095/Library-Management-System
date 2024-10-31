const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Determine if error is operational or unexpected
  if (err.isOperational) {
    // Expected (operational) error
    res.status(statusCode).json({
      status: err.status,
      message: message,
    });
  } else {
    // Unexpected programming error, log and respond with generic message
    console.error("ERROR 💥:", err); // Log for debugging
    res.status(500).json({
      status: err.status,
      message: "Something went very wrong!",
    });
  }
};

export default errorHandler;
