const mongoose = require('../services/mongodb');

const validator = require('validator');

const isEmail = (value) => {
    return validator.isEmail(value);
};

const feedbackSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    comments:{
        type: String,
        maxlength: [500, 'Please enter maximum 500 characters']
    },
})

const Feedback = mongoose.model('feedback', feedbackSchema);
module.exports = Feedback;