const express = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

const authRouter = express.Router();

// SIGN UP API
authRouter.post("/api/signup", async(req,res) => {
    // get the data from client  
    const {name, email, password } = req.body;
  
    try{
      //To do validation we need to create model -> user.js
      //validation
      const existingUser = await User.findOne({email});
      if (existingUser){
          return res.status(400).json({ msg: "User with same email already exist!"})
      }

      const hashedPassword = await bcryptjs.hash(password, 8);
  
     //Creating a user model for new user
      let user = new User ({
          email,
          password: hashedPassword,
          name,
      });
      //Saving data to DataBase
      user = await user.save();
      //Sending data to client site
      res.json(user);
    } catch(e){ 
      res.status(500).json({ error: e.message });
 }
   });

   // SIGN-IN API
   authRouter.post("/api/signin", async(req,res) => { 
    try{
       // get the data from client  
      const {email, password } = req.body;

      const user = await User.findOne({email});
      if(!user){
        return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
      }

    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch){
      return res
      .status(400)
      .json({ msg: "Incorrect Password. " });
    }

    const token = jwt.sign( { id: user._id}, "passwordKey");
    res.json({token, ...user._doc});
    } catch(e){ 
      res.status(500).json({ error: e.message });
 }
   });

   authRouter.post("/tokenIsValid", async (req, res) => {
      try{
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);
        const verified = jwt.verify(token, 'passwordKey');
        if(!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if(!user) return res.json(false);
        res.json(true);


      }catch(e){
        res.status(500).json({error: e.message});
      }
   });

   // Get user data
   authRouter.get( '/', auth, async(req, res) => {
    const user = await User.findById(req.user);
    res.json({...user._doc, token: req.token})
   })


module.exports = authRouter;