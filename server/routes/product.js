const express = require("express");
const { Cursor } = require("mongoose");
const productRouter = express.Router();
const auth = require("../middlewares/auth");
const { Product } = require('../models/product');

//Get the products
productRouter.get("/api/products", auth, async (req, res) => {
    try {
        const products = await Product.find({ category: req.query.category });
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

//Get the products for Search item
productRouter.get("/api/products/search/:name", auth, async (req, res) => {
    try {
        const products = await Product.find({ name: { $regex: req.params.name, $options: "i" } });
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

productRouter.post("/api/rate-product", auth, async (req, res) => {

    try {
        const { id, rating } = req.body;
        let product = await Product.findById(id);
        for (let i = 0; i < product.ratings.length; i++) {
            if (product.ratings[i].userId == req.user) {
                product.ratings.splice(i, 1);
                break;
            }
        }
        const ratingSchema = {
            userId: req.user,
            rating,
        }
        product.ratings.push(ratingSchema);
        product = await product.save();
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

productRouter.get("/api/deal-of-day", auth, async (req, res) => {
    try {
        let products = await Product.find({});
        products = products.sort((prev, current) => {

            let prevSum = 0;
            let currentSum = 0;

            for (let i = 0; i < prev.ratings.length; i++) {
                prevSum += prev.ratings[i].rating;
            }
            for (let i = 0; i < current.ratings.length; i++) {
                currentSum += current.ratings[i].rating;
            }
            return prevSum < currentSum ? 1 : -1;

        });
        // Returing highest rated product
        res.json(products[0]);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})
module.exports = productRouter;