const express = require("express");
const userRouther = express.Router();
const auth = require("../middlewares/auth");
const { Product } = require('../models/product');
const User = require("../models/user");


userRouther.post("/api/add-to-cart", auth, async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        let user = await User.findById(req.user);

        // Checking if cart is empty add the product
        if (user.cart.length == 0) {
            user.cart.push({ product, quantity: 1 });
        } 
        // If cart is not empty
        // Case 1 : product is present in cart so we can add one more quantity of it
        // Case 2 : product is not present in cart we can add one quantity of it
        else {
            let isProductPresent = false;
            for (let i = 0; i < user.cart.length; i++) {
                if (user.cart[i].product._id.equals(product._id)) {
                    isProductPresent = true;
                }
            }
            // Case 1
            if (isProductPresent) {
                let producttt = user.cart.find((productt) => productt.product._id.equals(product._id));
                producttt.quanity += 1;
            } 
            // Case 2
            else {
                user.cart.push({ product, quantity: 1 });
            }
        }

        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }



})

module.exports = userRouther;