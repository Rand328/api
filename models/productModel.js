const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        quantity: {
            type: Number,
            required: [true, "Please enter a quantity"],
            default: 0,
            validate: {
                validator: function (value) {
                    return Number.isInteger(value) && value >= 0;
                },
                message: "Quantity must be a non-negative integer",
            },
        },
        price: {
            type: Number,
            required: [true, "Please enter a price"],
            validate: {
                validator: function (value) {
                    return typeof value === 'number' && value > 0;
                },
                message: "Price must be a positive number",
            },
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

// Create text index on 'name' and 'description'
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;