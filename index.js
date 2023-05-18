const express = require("express");
const path = require("path");
const mongoose = require("./user");
const app = express();
const router = express.Router();
// set route to the ejs file
app.set("views", path.join(__dirname,"public"));
app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended:false}));
// use static file
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

app.get('/task',(req,res)=>{
    res.render("task to do");
})

app.get('/task-in-progress',(req,res)=>{
    res.render('task in progress');
})

app.get('/task-review',(req,res)=>{
    res.render('task_review');
})

app.get('/task-to-complete',(req,res)=>{
    res.render('task to complete');
})

app.get('/calendar',(req,res)=>{
    res.render("calendar");
})

app.get('/profile',(req,res)=>{
    res.render("profile");
})

app.get('/settings-advanced',(req,res)=>{
    res.render('settings-advanced');
})

app.get('/settings-general',(req,res)=>{
    res.render('settings-general');
})

app.get('/about-us',(req,res)=>{
    res.render('about us');
})

app.get('/feedback',(req,res)=>{
    res.render('feedback');
})

app.listen(3000, ()=>{
    console.log("Port Connected")
})