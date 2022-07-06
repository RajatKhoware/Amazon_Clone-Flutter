console.log("Hello world");

//Importing express as an external package
const express = require('express');

const app = express();

const PORT = 3000;

// CREATING AN API
// http://<your ipaddress>/hello-world

app.get("/", (req, res) => {
    res.json( { name : "Rajat"});
});


app.get("/hello-world", (req, res) => {
    res.json( { hi : "hello world"});
});

// GET,PUT,POST,DELETE,UPDATE->CRUD

//listen(----- ,ip adderss , call back function)
app.listen(PORT , () => {
    console.log(`connected at port ${PORT}`);
});
