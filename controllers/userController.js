const User = require('../models/userModel');

exports.createUser = async (req, res, next) => {
	try {
		const user = await User.create(req.body);

		res.status(201).json({
			status: 'success',
			count: user.length,
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({});

		res.status(200).json({
			status: 'success',
			count: users.length,
			data: {
				users,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.updateUser = async (req, res, next) => {
	try {
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
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};
