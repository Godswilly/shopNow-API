const express = require('express');
const { protectRoutes, roleAccess } = require('../controllers/authController');
const {
	createOrder,
	getAllOrder,
	getOrder,
	updateOrder,
	deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

router
	.route('/')
	.get(protectRoutes, roleAccess('admin'), getAllOrder)
	.post(protectRoutes, createOrder);

router
	.route('/:id')
	.get(protectRoutes, getOrder)
	.patch(protectRoutes, updateOrder)
	.delete(protectRoutes, deleteOrder);

module.exports = router;
