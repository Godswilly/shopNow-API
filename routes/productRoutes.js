const express = require('express');
const {
	createProduct,
	getAllProducts,
	getProduct,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getAllProducts).post(createProduct);

router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
