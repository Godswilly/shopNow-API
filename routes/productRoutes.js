const express = require('express');
const Product = require('../controller/productController');

const router = express.Router();

router
.route('/')
.get(getAllProducts)
.post(createProduct);

app.route('/:id')
.get(getProduct)
.patch(updateProduct)
.delete(deleteProduct);

module.exports = router;