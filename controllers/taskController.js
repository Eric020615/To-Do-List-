// import Task model
const Task = require('../models/Task');

module.exports.task_to_do_get = async (req,res,next) =>{
    const user = res.locals.user;
    let currentDate = new Date();
    const user_id = user._id;
    try{
        let query = await Task.find({user_id: user_id});
        console.log(query);
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
        res.status(400).json({err});
    }
}