const express = require('express');
const { protectRoutes, roleAccess } = require('../controllers/authController');
const {
	createProduct,
	getAllProducts,
	getProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getAllProducts).post(protectRoutes, createProduct);

router
	.route('/:id')
	.get(getProduct)
	.patch(protectRoutes, updateProduct)
	.delete(protectRoutes, roleAccess('admin', 'seller'), deleteProduct);

module.exports = router;
