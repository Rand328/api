const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const { postReview, getReviews, getReviewByProduct, getReviewByID, updateReview, deleteReview } 
    = require('../controllers/reviewController')

// Create a review and associate it with a product
router.post('/', postReview);

//fetch all reviews
router.get('/', getReviews)

// Search for reviews for a specific product based on product ID
router.get('/product/:productId', getReviewByProduct);


//fetch specific review by id
router.get('/:id', getReviewByID);

//update a review
router.patch('/:id', updateReview);

//delete a review
router.delete('/:id', deleteReview)

module.exports = router;
