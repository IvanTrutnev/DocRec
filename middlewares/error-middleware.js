const ApiError = require('../exceptions/api-error');

module.exports = (err, _, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  res.status(500).json({ message: 'Unexpected error' });

  next();
};
