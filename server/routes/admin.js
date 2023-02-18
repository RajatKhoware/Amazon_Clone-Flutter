const express = require("express");
const adminRouter = express.Router();
const admin = require("../middlewares/admin");
const { Product } = require('../models/product');
const User = require("../models/user");

//Adding product
adminRouter.post("/admin/add-product", admin, async (req, res) => {
    try {
        const { name, description, images, quantity, price, category } = req.body;
        let product = new Product({
            name,
            description,
            images,
            quantity,
            price,
            category,
        });

        product = await product.save();
        res.json(product);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//Get the products
adminRouter.get("/admin/get-products", admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

//Delete the products
adminRouter.post("/admin/delete-product", admin, async (req, res) => {
    try {
        const { id } = req.body;
        let products = await Product.findByIdAndDelete(id);
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

module.exports = adminRouter;