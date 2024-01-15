const Product = require('../models/productModel');

//post new product
const postProducts = async(req,res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);  // 201 status for successful creation
    } catch (error) {
        console.log(error.message)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//fetch all products
const getProducts = async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: errors.message})
    }
}

// Search for products based on a keyword
const getProductByKey = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ message: "Missing search query parameter 'q'. Please provide a search keyword." });
        }        

        const products = await Product.find({ $text: { $search: q } });

        if (products.length === 0) {
            return res.status(404).json({ message: `No products found matching the search term '${q}'` });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ message: error.message });
    }
}

//fetch specific product from id
const getProductByID = async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//update a product
const updateProduct = async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        //we cannot find any product in db
        if(!product){
            return res.status(404).json({message: `cannot find any product with id ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error){
        res.status(500).json({message: error.message})
    }
}

//delete a product
const deleteProduct = async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        //we cannot find any product in db
        if(!product){
            return res.status(404).json({message: `cannot find any product with id ${id}`});
        }
        res.status(200).json(product);

    } catch (error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    postProducts,
    getProducts,
    getProductByKey,
    getProductByID,
    updateProduct,
    deleteProduct,
}