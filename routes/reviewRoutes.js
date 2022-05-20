const express = require('express');
const {
	createReview,
	getAllReviews,
	getReview,
	updateReview,
	deleteReview,
} = require('../controllers/reviewController');

const router = express.Router();

router.route('/').get(getAllReviews).post(createReview);

router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
