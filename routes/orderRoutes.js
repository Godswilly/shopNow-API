const express = require('express');
const {
	createOrder,
	getAllOrder,
	getOrder,
	updateOrder,
	deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.route('/').get(getAllOrder).post(createOrder);

router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
