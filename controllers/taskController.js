// import Task model
const Task = require('../models/Task');

const handleErrors = (err) =>{
    let errors = {
        title: '',
        description: '',
        date: '',
        priority_level: '',
        progress_level: '',
    }

    if(err.message.includes('task validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

module.exports.task_to_do_get = async (req,res,next) =>{
    const user = res.locals.user;
    let currentDate = new Date();
    const user_id = user._id;
    try{
        let query = await Task.find({user_id: user_id});
        res.locals.tasks = query;
        res.locals.date = currentDate;
        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports.task_to_do_post = async (req,res) =>{
    let {user_id,title,description,date,priority_level,progress_level} = req.body;
    const user = res.locals.user;
    user_id = user._id;
    try{
        const task = await Task.create({user_id,title,description,date,priority_level,progress_level});
        res.status(201).json({task});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.task_delete = async (req,res) =>{
    let {task_id} = req.body;
    try{
        const task = await Task.deleteOne({_id:task_id});
        res.status(201).json({task});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.task_edit = async (req,res) =>{
    let {task_id,title,description,date,progress_level} = req.body;
    try{
        const task_edited = await Task.findOneAndUpdate({_id:task_id},{title:title,description:description,date:date,progress_level:progress_level})
        res.status(201).json({task_edited});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

// module.exports.task_done = async (req,res) =>{
//     let {done} = req.body;
//     try{
//         const task_edited = await Task.findOneAndUpdate({_id:task_id},{progress_level:done})
//         res.status(201).json({task_edited});
//         console.log({task_edited});
//     }
//     catch(err){
//         const errors = handleErrors(err);
//         res.status(400).json({errors});
//     }
// }