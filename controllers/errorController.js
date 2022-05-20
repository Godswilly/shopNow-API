const ErrorHandler = require('../utils/errorHandler');

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);

	const message = `Invalid input data. ${errors.join('. ')}`;
	return new ErrorHandler(message, 400);
};

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new ErrorHandler(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `Duplicate field value: ${value}. Please use another value`;

	return new ErrorHandler(message, 400);
};

const handleJWTError = () =>
	new ErrorHandler('Invalid Token, Please, Try again!', 401);

const handleJWTExpiredError = () =>
	new ErrorHandler('Your token has expired. Please log in again!', 401);

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		console.error('ERROR', err);

		res.status(500).json({
			status: 'error',
			message: 'Something went wrong!',
		});
	}
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };

		if (err.name === 'CastError') error = handleCastErrorDB(err);
		if (err.code === 11000) error = handleDuplicateFieldsDB(err);
		if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
		if (err.name === 'JsonWebTokenError') error = handleJWTError();
		if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

		sendErrorProd(error, res);
	}
};
