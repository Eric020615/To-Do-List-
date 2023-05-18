const express = require("express");
const path = require("path");
const mongoose = require("./user");
const page_route = require('./routes/page');
const app = express();
// set route to the ejs file
app.set("views", path.join(__dirname,"public"));
app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended:false}));
// use static file
app.use(express.static(__dirname + "/public/"));
app.use(page_route);

app.listen(3000, ()=>{
    console.log("Port Connected")
})