const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide product name'],
		maxlength: [50, 'Name cannot be more than 50 characters'],
		minlength: [3, 'Name cannot be less than 3 characters'],
		unique: true,
		trim: true,
	},
	description: {
		type: String,
		required: [true, 'Please provide product description'],
		trim: true,
	},
	category: {
		type: String,
		required: [true, 'Please select product category'],
		enum: [
			'Vehicles',
			'Fashion',
			'Health & Beauty',
			'Electronics',
			'Mobile Phones & Tablets',
			'Computers',
			'Food',
		],
	},
	slug: String,
	price: {
		type: Number,
		required: [true, 'Please provide product price'],
		default: 0,
	},
	countInStock: {
		type: Number,
		required: [true, 'Please provide number of product in stock'],
		default: 0,
	},
	dateAdded: {
		type: Date,
		default: Date.now,
		select: false,
	},
	images: [String],
	averageRating: {
		type: Number,
		default: 0,
		min: [1, 'Ratings must be above 1.0'],
		max: [5, 'Ratings must be below 5.0'],
		set: (val) => Math.round(val * 10) / 10,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'User',
	},
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
