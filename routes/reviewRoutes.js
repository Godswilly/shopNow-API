const express = require('express');
const { protectRoutes } = require('../controllers/authController');
const {
	createReview,
	getAllReviews,
	getReview,
	updateReview,
	deleteReview,
} = require('../controllers/reviewController');

const router = express.Router();

router.route('/').get(getAllReviews).post(protectRoutes, createReview);

router
	.route('/:id')
	.get(getReview)
	.patch(protectRoutes, updateReview)
	.delete(protectRoutes, deleteReview);

module.exports = router;
