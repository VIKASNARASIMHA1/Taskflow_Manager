const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors = null;

  // Prisma errors
  if (err.code === 'P2002') {
    statusCode = 400;
    message = 'Duplicate field value entered';
    errors = err.meta?.target;
  }

  if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map(e => e.message);
  }

  // Express validator errors
  if (err.array) {
    statusCode = 400;
    message = 'Validation error';
    errors = err.array().map(e => ({ field: e.param, message: e.msg }));
  }

  // Custom error
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  const response = {
    success: false,
    error: message,
    ...(errors && { details: errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(statusCode).json(response);
};

module.exports = errorHandler;