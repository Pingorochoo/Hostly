module.exports = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const response = {
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  };

  if (err.name === 'ValidationError') {
    response.message = 'Validation Error';
    response.errors = err.errors;
    statusCode = 400;
  }

  if (err.name === 'UnauthorizedError') {
    response.message = 'Authentication Error';
    statusCode = 401;
  }

  if (err.isCustomError) {
    response.message = err.customMessage;
    statusCode = err.customStatus || statusCode;
  }

  res.status(statusCode).json(response);
};