const Review = require('../models/reviewModel');
const asyncHandler = require('../utils/asyncHandler');

exports.createReview = asyncHandler(async (req, res, next) => {
	const review = await create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			review,
		},
	});
});

exports.getAllReviews = asyncHandler(async (req, res, next) => {
	const reviews = await Review.find({});

	res.status(200).json({
		status: 'success',
		count: reviews.length,
		data: {
			reviews,
		},
	});
});

exports.getReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			review,
		},
	});
});

exports.updateReview = asyncHandler(async (req, res, next) => {
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
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
	await Review.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});
