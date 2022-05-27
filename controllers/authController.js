const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/email');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const signup = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new ErrorHandler('Email already exists');
	}

	const newUser = await User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		passwordChangedAt: req.body.passwordChangedAt,
		role: req.body.role,
	});

	const token = signToken(newUser._id);

	res.status(201).json({
		status: 'success',
		token,
		data: {
			user: newUser,
		},
	});
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new ErrorHandler('Please enter your email and password', 400);
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.comparePassword(password, user.password))) {
		throw new ErrorHandler('Incorrect email or password', 401);
	}

	const token = signToken(user._id);

	res.status(200).json({
		status: 'success',
		token,
	});
});

const protectRoutes = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		throw new ErrorHandler(
			'You are not logged in! Please log in to get access.',
			401
		);
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded.id);

	if (!currentUser) {
		throw new ErrorHandler(
			'The user belonging to this token no longer exist.',
			401
		);
	}

	if (currentUser.changedPasswordAfter(decoded.iat)) {
		throw new ErrorHandler(
			'User recently changed password! Please log in again.',
			401
		);
	}

	req.user = currentUser;

	next();
});

const roleAccess =
	(...roles) =>
	(req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new ErrorHandler(
				'You do not have permission to perform this action',
				403
			);
		}
		next();
	};

const forgotPassword = asyncHandler(async (req, res) => {
	// 1) Get user based on posted email

	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		throw new ErrorHandler('There is no user with email address.', 404);
	}

	// 2) Generate the random reset token

	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	// 3) Send it to user's email

	const resetURL = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/users/resetPassword/${resetToken}`;

	const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Your password reset token (valid for 10 min)',
			message,
		});

		res.status(200).json({
			status: 'success',
			message: 'Token sent to email!',
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });

		throw new ErrorHandler(
			'There was an error sending the email. Try again later!',
			500
		);
	}
});

const resetPassword = asyncHandler(async (req, res) => {
	// 1) Get user based on the token

	const hashedToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	// 2) If token has not expired, and there is user, set the new password
	if (!user) {
		throw new ErrorHandler('Token is invalid or has expired', 400);
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// 3) Update changedPasswordAt property for the user

	// 4) log the user in, and send JWT
	const token = signToken(user._id);

	res.status(200).json({
		status: 'success',
		token,
	});
});

module.exports = {
	signup,
	login,
	protectRoutes,
	roleAccess,
	forgotPassword,
	resetPassword,
};
