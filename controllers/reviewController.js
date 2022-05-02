const Review = require('../models/reviewModel');

exports.createReview = async (req, res, next) => {
	try {
		const review = await create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				review,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.getAllReviews = async (req, res, next) => {
	try {
		const reviews = await Review.find({});

		res.status(200).json({
			status: 'success',
			count: reviews.length,
			data: {
				reviews,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.getReview = async (req, res, next) => {
	try {
		const review = await Review.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				review,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.updateReview = async (req, res, next) => {
	try {
		const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			data: {
				review,
			},
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.deleteReview = async (req, res, next) => {
	try {
		await Review.findByIdAndDelete(req.params.id);

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
