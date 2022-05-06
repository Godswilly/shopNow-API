const Order = require('../models/orderModel');
const asyncHandler = require('../utils/asyncHandler');

exports.createOrder = asyncHandler(async (req, res, next) => {
	const order = await Order.create(req.body);

	res.status(201).json({
		status: 'success',
		count: order.length,
		data: {
			order,
		},
	});
});

exports.getAllOrder = asyncHandler(async (req, res, next) => {

		const order = await Order.find({});

		res.status(200).json({
			status: 'success',
			count: order.length,
			data: {
				order,
			},
		});

});

exports.getOrder = asyncHandler(async (req, res, next) => {
	
		const order = await Order.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				order,
			},
		});

});

exports.updateOrder = asyncHandler(async (req, res, next) => {
	
		const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			count: order.length,
			data: {
				order,
			},
		});

});

exports.deleteOrder = asyncHandler(async (req, res, next) => {

		await Order.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});

});
