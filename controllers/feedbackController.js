const Feedback = require('../models/Feedback');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
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

// this is asychronous function
// it will return promise
module.exports.feedback_post = async (req,res) =>{
    const {username,email,comments,file} = req.body;
    try{
        const feedback = await Feedback.create({username,email,comments,file});
        res.status(201).json({feedback:feedback._id});
    }
    catch(err){
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({errors});
    }
}