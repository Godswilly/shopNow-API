const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');

exports.createUser = asyncHandler(async (req, res, next) => {
	const user = await User.create(req.body);

	res.status(201).json({
		status: 'success',
		count: user.length,
		data: {
			user,
		},
	});
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find({});

	res.status(200).json({
		status: 'success',
		count: users.length,
		data: {
			users,
		},
	});
});

exports.getUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

exports.updateUser = asyncHandler(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
	await User.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});
