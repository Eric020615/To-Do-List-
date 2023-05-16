const express = require("express");
const path = require("path");
const mongoose = require("./user");
const app = express();
const router = express.Router();
app.set("views", path.join(__dirname,"public"));
app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + "/public/"));

app.get('/',(req,res)=>{
    res.render("intro")
});

app.get('/signup',(req,res)=>{
    res.render("signup");
});

app.get('/login',(req,res)=>{
    res.render("login");
});

app.get('/home',(req,res)=>{
    res.render("home");
})

app.listen(3000, ()=>{
    console.log("Port Connected")
})