const mongoose = require('mongoose');

//Basically the structure of our model -> Schema
const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);            
            },
            message: 'Please enter a valid email address'
        },
    },
    password: {
        required: true,
        type: String,
    },
    address: {  
        type: String,
        default: '',
    },   
    type: {
        type: String,
        default: 'user',
    }
    //cart
});

//The upper part is structure of our user now lets create usermodel in below code
//Now creating model of our structure .model( user name, and schema)
const User = mongoose.model("User", userSchema);

//Export
module.exports = User;