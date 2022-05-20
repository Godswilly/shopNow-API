const Product = require('../models/productModel');
const asyncHandler = require('../utils/asyncHandler');
const ErrorHandler = require('../utils/errorHandler');

const createProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		status: 'success',
		count: product.length,
		data: {
			product,
		},
	});
});

const getAllProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find({});

	res.status(200).json({
		status: 'success',
		count: products.length,
		data: {
			products,
		},
	});
});

const getProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		return next(new ErrorHandler('No product found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			product,
		},
	});
});

const updateProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!product) {
		return next(new ErrorHandler('No product found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			product,
		},
	});
});

const deleteProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findByIdAndDelete(req.params.id);

	if (!product) {
		return next(new ErrorHandler('No product found with that ID', 404));
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
});

module.exports = {
	createProduct,
	getAllProducts,
	getProduct,
	updateProduct,
	deleteProduct,
};
