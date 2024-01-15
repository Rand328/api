const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

const postReview = async (req, res) => {
    try {
        const { product } = req.body;

        // Log the contents for debugging
        console.log('Request Body:', req.body);
        console.log('Product ID:', product);

        // Check if the product exists
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            console.log('Product not found.');
            return res.status(404).json({ message: `Cannot find any product with id ${product}` });
        }

        // Create the review and associate it with the product
        const review = await Review.create({
            product,
            ...req.body,
        });

        // Log the order of operations
        console.log('After Review.create, Before Validation');
        console.log('Review Object Before Validation:', review);

        // Check if the 'reviews' array exists in 'existingProduct' before pushing the review ID
        if (!existingProduct.reviews) {
            existingProduct.reviews = [];
        }

        existingProduct.reviews.push(review._id);
        await existingProduct.save();

        // Log the order of operations
        console.log('After existingProduct.reviews.push, Before res.status(201).json');

        res.status(201).json(review);
    } catch (error) {
        console.error('Error:', error); // Log the full error for debugging

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Include error message in the response
    }
};


//fetch all reviews
const getReviews = async(req,res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Search for reviews for a specific product based on product ID
const getReviewByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with id ${productId}` });
        }

        // Fetch reviews for the specified product
        const reviews = await Review.find({ product: productId });
        
        res.status(200).json(reviews);

    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: error.message });
    }
}

//fetch specific review by id
const getReviewByID = async(req,res) => {
    try {
        const {id} = req.params;
        const review = await Review.findById(id);
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//update a review
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
  
        let review = await Review.findById(id);
  
        if (!review) {
            return res.status(404).json({ message: `Cannot find any review with id ${id}` });
        }
  
        if (rating) { review.rating = rating; }
        if (comment) { review.comment = comment; }
  
        await review.save();
        res.status(200).json(review);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  }

//delete a review
const deleteReview = async(req,res) => {
    try{
        const {id} = req.params;
        const review = await Review.findByIdAndDelete(id);
        //we cannot find any review in db
        if(!review){
            return res.status(404).json({message: `cannot find any review with id ${id}`});
        }
        res.status(200).json(review);

    } catch (error){
        res.status(500).json({message: error.message})
    }
}


module.exports = {
    postReview,
    getReviews,
    getReviewByProduct,
    getReviewByID,
    updateReview,
    deleteReview
}