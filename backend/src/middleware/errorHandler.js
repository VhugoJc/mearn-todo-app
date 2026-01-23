const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID',
      message: 'Resource not found'
    });
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate Entry',
      message: 'Resource already exists'
    });
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: messages.join(', ')
    });
  }
  
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
    message: 'Something went wrong'
  });
};

module.exports = errorHandler;
