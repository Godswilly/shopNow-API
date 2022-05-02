const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	rating: {
		type: Number,
		min: [1, 'Rating must be above 1.0'],
		max: [5, 'Rating must be below 5.0'],
	},
	review: {
		type: String,
		required: [true, 'Please provide review text'],
	},
	dateAdded: {
		type: Date,
		default: Date.now,
		select: false,
	},
	product: {
		type: mongoose.Schema.ObjectId,
		ref: 'Product',
		required: [true, 'Review must belong to a product.'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Review must belong to a user.'],
	},
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
