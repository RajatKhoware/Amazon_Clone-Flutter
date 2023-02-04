//IMPORTS FROM PACKAGES
const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');

//IMPORTS FRON OTHER FILES
const authRouter = require("./routes/auth");

//INIT
const app = express();
const PORT = 3000;
const DB = "mongodb+srv://rajat123:rajat123@cluster0.y2l4omm.mongodb.net/?retryWrites=true&w=majority";

//middleware
//CLINT -> MIDDLEWARE -> SERVER -> CLIENT
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);

//Connection with mongoDB Databasee
mongoose
.connect(DB)
.then( () => {
    console.log("Connection Successful");
})
.catch((e) => {
     console.log(e);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`);
});
