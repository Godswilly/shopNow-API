const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});

	res.status(200).json({
		status: 'success',
		count: users.length,
		data: {
			users,
		},
	});
});

const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		throw new ErrorHandler('No user found with the given ID', 404);
	}

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!user) {
		throw new ErrorHandler('No user found with the given ID', 404);
	}

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

const updateMe = asyncHandler(async (req, res) => {
	// 1) Create error if user posts password data

	if (req.body.password || req.body.passwordConfirm) {
		throw new ErrorHandler(
			'This route is not for password updates. Please use /updateMyPassword',
			400
		);
	}
	// 2) Filtered out unwanted field names that are not allowed to be updated

	const filteredBody = filterObj(req.body, 'name', 'email');

	// 3) Update user document

	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser,
		},
	});
});

const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findByIdAndDelete(req.params.id);

	if (!user) {
		throw new ErrorHandler('No user found with the given ID', 404);
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

const deleteMe = asyncHandler(async (req, res) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

module.exports = {
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	updateMe,
	deleteMe,
};
