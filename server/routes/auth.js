const express = require('express');
const User = require('../models/user');

const authRouter = express.Router();

authRouter.post("/api/signup", async(req,res) => {
    // get the data from client  
    const {name, email, password } = req.body;

    //validation
    const existingUser = await User.findOne({email});
    if (existingUser){
        return res.status(400).json({ msg: "User with same email already exist!"})
    }

   //Creating a user model for new user
    let user = new User ({
        email,
        password,
        name,
    });
    user = await user.save();
    //Sending data to client site
    res.json(user);
    // post that data in database
    // return that data to the user
   });

module.exports = authRouter;