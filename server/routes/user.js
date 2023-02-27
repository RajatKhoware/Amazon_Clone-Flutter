const express = require("express");
const userRouther = express.Router();
const auth = require("../middlewares/auth");
const { Product } = require('../models/product');
const { findById } = require("../models/user");
const User = require("../models/user");
const Order = require("../models/order");


// Add to cart
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
                producttt.quantity = producttt.quantity + 1;
                console.log("product present");

            }
            // Case 2
            //From map model class ke bare se samjna hai map method ke bare me samjna hai
            //
            else {
                user.cart.push({ product, quantity: 1 });
            }
        }

        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Delete product from cart
userRouther.delete("/api/remove-from-cart/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        let user = await User.findById(req.user);

        for (let i = 0; i < user.cart.length; i++) {
            if (user.cart[i].product._id.equals(product._id)) {
                if (user.cart[i].quantity == 1) {
                    user.cart.splice(i, 1);
                } else {
                    user.cart[i].quantity -= 1;
                }
            }
        }
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Save user address
userRouther.post("/api/save-user-address", auth, async (res, req) => {
    try {
        const { address } = req.body;
        let user = await User.findById(req.user);
        user.address = address;
        user = await user.save();
        res.json(user);
        console.log('pata mhi');
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Order List
userRouther.post("/api/order", auth, async (req, res) => {
    try {
        const { cart, totalPrice, address } = req.body;

        let products = [];

        for (let i = 0; i < cart.length; i++) {
            let product = await Product.findById(cart[i].product._id);
            if (product.quantity >= cart[i].quantity) {
                product.quantity -= cart[i].quantity;
                products.push({ product, quantity: cart[i].quantity })
                await product.save();
            }
            else {
                return res.status(400).json({ msg: `${product.name} is out of stock!` });
            }

            let user = await User.findById(req.user);
            user.cart = [];
            user = await user.save();

            let order = new Order({
                products,
                totalPrice,
                address,
                userId: req.user,
                orderedAt: new Date().getTime(),
            })

            order = await order.save();
            res.json(order);
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = userRouther;