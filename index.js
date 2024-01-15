require('dotenv').config()

const express = require ('express');
const mongoose = require ('mongoose');

const productRoute = require('./routes/productRoute')
const reviewRoute = require('./routes/reviewRoute')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/products', productRoute);
app.use('/api/reviews', reviewRoute);

const MONGO_URL = process.env.MONGO_URL;


app.get('/',(req,res) => {
    res.send('Hello NODE API')
});


mongoose.connect(MONGO_URL)
.then(() => {
    console.log("MongoDB connected");

    app.listen(
        PORT,
        () => console.log(`it's alive on http://localhost:${PORT}`)
    );    
}).catch(err => console.log(err));

