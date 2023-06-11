const mongoose = require('../services/mongodb');
// destructure and we get the method from the validator
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

// create a schema for the models
// what properties will a user have
// this objects defind how the documents look like in the database
const userSchema = new mongoose.Schema({
    // we need to define how the objects look like (properties)
    email:{
        // here start properties
        type: String,
        // set required means if email is empty, this model will not be created 
        // [rules, custom error message if rules violated]
        required: [true, 'Please enter an email.'],
        // we cannot use the error message for unique properties
        unique: true,
        lowercase: true,
        // to make sure the email typed fulfill the pattern
        // set a function that takes the typed email as arguments and return true/false value
        // isEmail is a function from validator
        validate: [isEmail, 'Please enter a valid email address']
    },
    phone_num:{
        type: String,
        required: [true, 'Please enter a phone number'],
    },
    password:{
        type: String,
        required: [true, 'Please enter password.'],
        minlength: [6, 'Please enter mininum 6 characters.']
    },
    username:{
        type: String,
    },
    date_of_birth:{
        type: Date,
    },
        image:{
        // buffer is a binary data
        data: Buffer,
        contentType: String,
    },
});

// hook functions (post(), pre())
// fire a function after documents (json) saved to db 
// not post request, => somethings happening after post
// ('after event occurs', 'what to do')
userSchema.post('save', function(doc, next){
    console.log('New user was created and saved', doc);
    // we need to use next function in all mongoose middleware or hooks to avoid hanging the process
    next();
});

// fire a function before doc saved to the db
userSchema.pre('save', async function(next){
    // this == local documents haven't saved in db since it is before
    // adding salt and make it random characters
    // this is asynchrounous so we need to put await
    const salt = await bcrypt.genSalt();
    // make password hashed
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user
userSchema.statics.login = async function(email, password){
    // extract document by searching email 
    const user = await this.findOne({email})
    // if document found
    if(user){
        // compare the local password and user password in db
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user
        }
        throw Error('Incorrect Password')
    }
    throw Error('Incorrect Email')
}

// create a model based on the schema
// pass it what we need to call a model
const User = mongoose.model('user', userSchema);
// export the user model
module.exports = User;