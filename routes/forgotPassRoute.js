const { Router } = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = Router();

const mongoose = require('../services/mongodb');
const User = require('../models/User')

const bcrypt = require("bcrypt");


const jwt_secret = "some super secret...";

router.get('/', (req, res) => {
    res.send("Hello World");
})

router.get('/forgot-password', (req, res, next) =>{
    res.render('forgot-password')
})

router.post('/forgot-password', async (req, res, next) =>{
    const {email} = req.body;

    try{
        //check if user exists in database
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User does not exist." });
        }

        //Create a one-time link that valid for 15 minutes
        const secret = jwt_secret + oldUser.password;
        const payload = {
            email: oldUser.email,
            id: oldUser.id
        }
        const token = jwt.sign(payload, secret, {expiresIn: '15m'});
        const link = `http://localhost:3000/reset-password/${oldUser.id}/${token}`;
        console.log(link);

        //Prompt successful message (Maybe need to fix here)
        res.send("Password reset link has been sent to your email.")

        //Calling nodemailer
        var transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
            user: "ticktoktasks@outlook.com",
            pass: "ttt123456",
            },
        });
    
        var mailOptions = {
            from: "ticktoktasks@outlook.com",
            to: oldUser.email,
            subject: "Tick Tok Tasks Account Password Reset",
            text: "Dear user,\n\nKindly please click on the below link to reset your password. The link will be expired in 15 minutes. Thank you.\n\n" + link,
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
            console.log(error);
            } else {
            console.log("Email sent: " + info.response);
            }
        });
    } catch (error) { }
      
});

router.get('/reset-password/:id/:token', async (req, res, next) => {
    const {id, token} = req.params;
    
    //check if user exists in database
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User does not exist." });
    }

    const secret = jwt_secret + oldUser.password;
    try {
        const payload = jwt.verify(token, secret);
        res.render("reset-password", {email: payload.email,  status: "Not verified."})
    } catch(error){
        console.log(error.message);
        res.send(error.message);
    }
});

router.post('/reset-password/:id/:token', async (req, res, next) => {
    const {id, token} = req.params;
    const {password, password2} = req.body;
    
    //Check if user exists in database
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        //prompt message (here a bit weird)
        alert("User does not exist.");
        return res.json({ status: "User does not exist." });
    }

    const secret = jwt_secret + oldUser.password;
    try {
        const payload = jwt.verify(token, secret);  
        //hash the password
        const encryptedPassword = await bcrypt.hash(password, 10);
        //check password and password2 if they are match (here also got problem, cannot check)
        if (password !== password2) {
            //prompt message(got problem)
           alert("Passwords do not match, please re-enter.");
           return;
           
        } else{
            // Update in database with new password
            await User.updateOne(
                {
                _id: id,
                },
                {
                $set: {
                    password: encryptedPassword,
                },
                }
            );
            //prompt successful message(here got problem) 
            alert("Your password is successfully reset. Please return to login page.");     
            res.render("reset-password", { email: payload.email, status: "Verified." });
        }
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
});

module.exports = router;