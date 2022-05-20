const Review = require('../models/reviewModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

const createReview = asyncHandler(async (req, res, next) => {
	const review = await create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			review,
		},
	});
});

const getAllReviews = asyncHandler(async (req, res, next) => {
	const reviews = await Review.find({});

	res.status(200).json({
		status: 'success',
		count: reviews.length,
		data: {
			reviews,
		},
	});
});

const getReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findById(req.params.id);

	if (!review) {
		throw new ErrorHandler('No review found with the given ID', 404);
	}

	res.status(200).json({
		status: 'success',
		data: {
			review,
		},
	});
});

const updateReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!review) {
		throw new ErrorHandler('No review found with the given ID', 404);
	}

	res.status(200).json({
		status: 'success',
		data: {
			review,
		},
	});
});

const deleteReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findByIdAndDelete(req.params.id);

	if (!review) {
		throw new ErrorHandler('No review found with the given ID', 404);
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

module.exports = {
	createReview,
	getAllReviews,
	getReview,
	updateReview,
	deleteReview,
};
