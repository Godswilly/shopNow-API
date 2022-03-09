const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },
    dateAdded: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
