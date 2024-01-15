// models/reviewModel.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the Product model
            required: [true, "Please specify the product for the review"],
        },
        rating: {
            type: Number,
            required: [true, "Please enter a rating for the review"],
            min: [1, "Rating must be between 1 and 5"],
            max: [5, "Rating must be between 1 and 5"],
        },
        comment: {
            type: String,
            required: [true, "Please enter a comment for the review"],
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
