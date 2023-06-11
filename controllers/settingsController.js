const User = require('../models/User');
const Task = require('../models/Task');
const bcrypt = require('bcrypt')

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        phone_num: '',
        password: ''
    }

     // incorrect password
    if (err.message === 'Incorrect Password'){
        errors.password = 'Previous password is incorrect'
    }

    // return json
    return errors;
}

module.exports.change_password = async (req,res)=>{
    let {_id} = res.locals.user;
    let {previous_password,new_password} = req.body;
    const currentUser = await User.findOne({_id});
    try{
        const verified = await bcrypt.compare(previous_password,currentUser.password);
        const salt = await bcrypt.genSalt();
        const hash_password = await bcrypt.hash(new_password,salt);
        if(verified){
            const status = await User.findOneAndUpdate({_id:_id},{password:hash_password});
            res.status(200).json({status});
        }
        else{
            throw Error('Incorrect Password')
        }
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.verify_email = async(req,res)=>{
    let {email} = req.body;
    try{
        const status = await User.find({email:email});
        // const delete_status = await User.deleteOne({email:email});
        if(status){
            res.status(200).json({status});
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports.delete_account = async(req,res)=>{
    let {glob_email} = req.body;
    try{
        const delete_status = await User.deleteOne({email:glob_email});
        const delete_task = await Task.deleteMany({email:glob_email});
        res.status(200).json({delete_status});
    }
    catch(err){
        console.log(err);
        res.status(200).json({err});
    }
}