const express = require('express');
const { postProducts, getProducts, getProductByKey, getProductByID, updateProduct, deleteProduct } 
    = require('../controllers/productController')
const router = express.Router();

//create product and post to db
router.post('/', postProducts);

//fetch all products
router.get('/', getProducts)

// Search for products based on a keyword
router.get('/search', getProductByKey);


//fetch specific product from id
router.get('/:id', getProductByID);

//update a product
router.put('/:id', updateProduct)

//delete a product
router.delete('/:id', deleteProduct)

module.exports = router;