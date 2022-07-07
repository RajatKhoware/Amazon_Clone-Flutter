//IMPORTS FROM PACKAGES
const e = require('express');
const express = require('express');
const mongoose = require('mongoose');

//IMPORTS FRON OTHER FILES
const authRouter = require("./routes/auth");

//INIT
const app = express();
const PORT = 3000;
const DB = "mongodb+srv://rajat123:rajat123@cluster0.y2l4omm.mongodb.net/?retryWrites=true&w=majority";

//middleware
//CLINT -> MIDDLEWARE -> SERVER -> CLIENT
app.use(authRouter);

//CONNECT
mongoose
.connect(DB)
.then( () => {
    console.log("Connection Successful");
})
.catch((e) => {
     console.log(e);
});

app.listen(PORT , () => {
    console.log(`connected at port ${PORT}`);
});
