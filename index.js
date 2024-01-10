const express = require ('express');
const mongoose = require ('mongoose');
const Product = require('./models/productModel');
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res) => {
    res.send('Hello NODE API')
});

app.get('/',(req,res) => {
    res.send('Hello Blog')
});

//fetch all products
app.get('/products', async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: errors.message})
    }
})

//fetch specific product from id
app.get('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: errors.message})
    }
})

//crate product and post to db
app.post('/products', async(req,res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
    
});

//update a product
app.put('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //we cannot find any product in db
        if(!product){
            return res.status(404).json({message: `cannot find any product with id ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error){
        res.status(500).json({message: error.message})
    }
})

//delete a product
app.delete('/products/:id', async(req,res) => {
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
})

mongoose.connect("mongodb+srv://admin:admin12345@cluster0.pshiv2t.mongodb.net/NodeApi?retryWrites=true&w=majority")
.then(() => {
    console.log("MongoDB connected");

    app.listen(
        PORT,
        () => console.log(`it's alive on http://localhost:${PORT}`)
    );    
}).catch(err => console.log(err));



// tutorial: https://www.youtube.com/watch?v=-MTSQjw5DrM
// tutorial2: https://www.youtube.com/watch?v=9OfL9H6AmhQ 