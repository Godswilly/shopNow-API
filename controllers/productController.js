const Product = require('../models/productModel');
const asyncHandler = require('../utils/asyncHandler');

exports.createProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		status: 'success',
		count: product.length,
		data: {
			product,
		},
	});
});

exports.getAllProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find({});

	res.status(200).json({
		status: 'success',
		count: products.length,
		data: {
			products,
		},
	});
});

exports.getProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			product,
		},
	});
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
	const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			product,
		},
	});
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
	await Product.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});
