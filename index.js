const express = require("express");
const path = require("path");
const mongoose = require('./services/mongodb')
const page_route = require('./routes/page');
const auth_route = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// set route to the ejs file
app.set("views", path.join(__dirname,"public"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));

// use as middleware (express)
// it use static file
app.use(express.static(__dirname + "/public/"));
// it takes any json and passed it to the javascript object
app.use(express.json());
// passing cookie data
app.use(cookieParser());

// route
app.use(page_route);
app.use(auth_route);

app.listen(3000, ()=>{
    console.log("Port Connected")
});

// //  cookies (Store information in the client browser)
// app.get('set-cookies',(req,res)=>{
//     // set cookie('Cookie name','cookie value')
//     // res.setHeader('set-Cookie','newUser=true');
//     // update a cookie or create a cookie {specify properties inside cookie}
//     res.cookie('newUser', false);
//     // maxAge == session of cookie (1000ms * 60s * 60min * 24h)
//     // secure == cookie is only send when https connection
//     // httpOnly == cookie can only transfer by http protocol (make sure cookie not able to be accessed by frontend javascript == document.cookie)
//     res.cookie('isEmployee', true, {maxAge:1000*60*60*24, httpOnly:true});
//     res.send('You got the cookies');
// });

// app.get('get-cookies',(req,res)=>{
//     const cookies = req.cookies;
//     console.log(cookies);
//     // cookies(object) make it json file
//     res.json(cookies);
// });
