const jwt = require('jsonwebtoken');
const User = require('../models/User');

// create middleware function
const requireAuth = (req, res, next) =>{
    // request cookies in client browser that called jwt
    const token = req.cookies.jwt;
    // check json web token exists and verified
    if(token){
        // need to verify token by using secret words
        jwt.verify(token, 'to-do-list', (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }   
    else{
        res.redirect('/login');
    }
}

// check current user
const checkUser = (req, res, next) => {
    // request cookies in application 
    const token = req.cookies.jwt;

    // if token exists
    if(token){
        // need to verify token by using secret words
        jwt.verify(token, 'to-do-list', async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else{
                // inside decodedToken we have pillars called id
                // checking the id inside jwt cookies whether same with the id in the db
                let user = await User.findById(decodedToken.id);
                // assign user document to local user
                res.locals.user = user;
                console.log(user);
                next();
            }
        });
    }
    else{
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth, checkUser};