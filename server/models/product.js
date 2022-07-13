const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
     name: {
        required: true,
        type: String,
        trim: true,
     },
     description: {
        required: true,
        type: String,
        trim: true,
     },
     image: [
        {
        require: true,
        type: String,
     }
    ],
    price:{
        require: true,
        type: Number,
    },
    quantity:{
        require: true,
        type: Number,  
    },
    category: {
        required: true,
        type: String,
     },

});


const Product = mongoose.model("Product", productSchema);
module.exports = Product;