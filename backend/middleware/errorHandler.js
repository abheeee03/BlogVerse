const errorHandler = (err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Log error for debugging
  if (!isProduction) {
    console.error(err.stack);
  }

  // Default error status and message
  const status = err.status || 500;
  const message = isProduction ? 'Internal Server Error' : err.message;

  res.status(status).json({
    error: {
      message,
      ...(isProduction ? {} : { stack: err.stack })
    }
  });
};

module.exports = errorHandler; 