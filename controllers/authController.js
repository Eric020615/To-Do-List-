// import user models
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const smtp = require('../services/smtp');
const bcrypt = require('bcrypt');

// evaluate the error and define what message return to user
const handleErrors = (err) => {
    // err.code not usable for a lot of field but it is usable by unique properties for the objects
    console.log(err.message, err.code);
    // create an error object inside the brackets is the properties for the objects
    let errors = {
        email: '',
        phone_num: '',
        password: ''
    }

    // incorrect email
    if (err.message === 'Incorrect Email'){
        errors.email = 'That email is not registered'
    }

     // incorrect password
     if (err.message === 'Incorrect Password'){
        errors.password = 'That password is incorrect'
    }

    // duplicate error code (since we can't leave error message for unique properties) 
    // === type and values check
    if (err.code === 11000){
        errors.email = 'That email is already registered';
        return errors;
    }

    // validation errors (if this sentence present in the err.message string)
    if(err.message.includes('user validation failed')){
        // we access to err(json) => erros(objects inside json) => .values(properties(array))
        // {} destructure it and we need not to error.properties we can directly access the properties inside error objects for the loop
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }
    // return json
    return errors;
}

// 3 days lifespan of cookie
const maxAge = 3 * 24 * 60 * 60;
// create json web token
const createToken = (id) =>{
    return jwt.sign({id},'to-do-list',{
        // to specify the session of json web token cookies
        expiresIn: maxAge
    });
}

// exports signup_post function
// this is asychronous function
// it will return promise
module.exports.signup_post = async (req,res) =>{
    const {email, phone_num, password} = req.body;
    try{
        let username = "Username"
        let date_of_birth = null
        let image = null;
        // need to wait the process done 
        // create the documents by mongoose
        const user = await User.create({email, phone_num, password,username,date_of_birth});
        // pass user id into token
        const token = createToken(user._id);
        // make jwt token as cookie and response by http, send it back to the client browser (application tab)
        res.cookie('jwt',token, {httpOnly: true, maxAge: maxAge * 1000 });
        // we need to send the response (201) == success and save the user id in the json and return back
        res.status(201).json({user:user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        // send back json object
        res.status(400).json({errors});
    }
}

// asynchronous function
module.exports.login_post = async (req,res) =>{
    // access the body
    // request body
    // we can access email and password from request body and grab it from request body
    const {email,password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true, maxAge: maxAge*1000});
        res.status(200).json({user:user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.logout_get = (req, res) =>{
    // make jwt cookie to be empty so that json web token assume it is wrong jwt cookie
    res.cookie('jwt','',{maxAge: 1});
    res.redirect('/');
}

module.exports.forgot_password_get = (req,res) =>{
    res.render('forgot-password')
}

let jwt_secret = "Tick-Tok-Tasks";
module.exports.forgot_password_post = async (req,res,next) =>{
    const {email} = req.body;
    const verified = await User.exists({email:email});
    let oldUser = await User.find({email:email});
    //check if user exists in database
    try{ 
        if(verified) {
            //Create a one-time link that valid for 15 minutes
            const secret = jwt_secret + oldUser[0].password;
            const payload = {
                email: oldUser[0].email,
                id: oldUser[0]._id
            }
            res.status(200).json({payload});
            const token = jwt.sign(payload, secret, {expiresIn: '15m'});
            const link = `http://localhost:3000/reset-password/${oldUser[0]._id}/${token}`;
            let subject= "Tick Tok Tasks Account Password Reset";
            let message= "Dear user,\n\nKindly please click on the below link to reset your password. The link will be expired in 15 minutes. Thank you.\n\n" + link;
            smtp.sendEmail_reset_password(email,subject,message);
        }
        else{
            let error = "Not Found"
            await res.status(400).json({error});
        }
    } catch (error) { 
        console.log(error);
    } 
}

module.exports.reset_password_get = async(req,res,next) =>{
    const {id, token} = req.params;
    try {
        //check if user exists in database
        const oldUser = await User.findOne({_id: id});
        const secret = jwt_secret + oldUser.password;
        const payload = jwt.verify(token, secret);
        // res.render("reset-password", {email: payload.email,  status: "Not verified."})
        if (oldUser) {
            res.render("reset-password", {email: payload.email,  status: "Not verified."})
        }
    } catch(error){
        console.log(error.message)
        res.status(400).json({error});
    }
}

module.exports.reset_password_post = async(req,res,next) =>{
    // extract from the url
    const {password1,password2,email} = req.body;
    try {
        if(password1===password2){
            //hash the password
            const salt = await bcrypt.genSalt();
            const encryptedPassword = await bcrypt.hash(password2, salt);
            //check password and password2 if they are match (here also got problem, cannot check)
            // Update in database with new password
            const status = await User.findOneAndUpdate({email: email},{password:encryptedPassword});
            res.status(200).json({status});
            //prompt successful message(here got problem) 
            // alert("Your password is successfully reset. Please return to login page.");     
        }
        if(password1!=password2){
            let error = {
                password : 'Passwords do not match, please re-enter.'
            }
            res.status(400).json({error});
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json({error});
    }
}