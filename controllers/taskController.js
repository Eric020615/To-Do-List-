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

module.exports.home_get = async (req,res,next) =>{
    const user_id = res.locals.user._id;
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    var datestring = year + "-" + ("0"+(month+1)).slice(-2) + "-" + ("0" + day).slice(-2);
    try{
        let today_list = await Task.find({
            user_id: user_id,
            date : {
                $regex: '.*' + datestring + '.*', //or you can use `.*${name}.*`
            }
        })
        res.locals.today_list = today_list;
        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports.task_to_do_get = async (req,res,next) =>{
    const user = res.locals.user;
    let currentDate = new Date();
    const user_id = user._id;
    try{
        let query = await Task.find({
            user_id: user_id, 
            progress_level: 0,
        });
        res.locals.tasks = query;
        res.locals.date = currentDate;
        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports.task_to_do_post = async (req,res) =>{
    let {_id,email} = res.locals.user;
    user_id = _id;
    try{
        const task = new Task({
            email: email,
            user_id: _id,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            priority_level: req.body.priority_level,
            progress_level: req.body.progress_level,
            email_frequence: 0
        })
        await task.save();
        res.status(201).json({task});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.task_to_do_clear = async (req,res,next) =>{
    let {_id} = res.locals.user;
    try{
        const clear_to_do = await Task.deleteMany({
            user_id:_id,
            progress_level: 0
        });
        res.status(200).json({clear_to_do});
    }
    catch(err){
        res.status(400).json({err});
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

module.exports.task_done = async (req,res) =>{
    let {task_id,progress_level} = req.body;
    try{
        const task_done = await Task.findOneAndUpdate({_id:task_id},{progress_level:progress_level})
        res.status(201).json({task_done});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.task_in_progress_get = async (req,res,next) =>{
    let {_id} = res.locals.user;
    try{
        const done_in_progress = await Task.find({
            user_id:_id,
            progress_level: {$gte:10,$lte:90},
        })
        res.locals.tasks = done_in_progress;
        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports.task_in_progress_clear = async (req,res,next) =>{
    let {_id} = res.locals.user;
    try{
        const clear_in_progress = await Task.deleteMany({
            user_id:_id,
            progress_level: {$gte:10,$lte:90},
        });
        res.status(200).json({clear_in_progress});
    }
    catch(err){
        res.status(400).json({err});
    }
}

module.exports.task_in_progress_edit = async (req,res,next) =>{
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

module.exports.task_in_progress_dlt = async (req,res,next) =>{
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

module.exports.task_in_progress_done = async (req,res,next) =>{
    let {task_id,progress_level} = req.body;
    try{
        const task_done = await Task.findOneAndUpdate({_id:task_id},{progress_level:progress_level})
        res.status(201).json({task_done});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.task_complete_get = async (req,res,next) =>{
    const {_id} = res.locals.user;
    try{
        const done_task = await Task.find({
            user_id:_id,
            progress_level:100
        })
        res.locals.tasks = done_task;
        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports.task_complete_delete = async (req,res,next) =>{
    const {_id} = res.locals.user; 
    try{
        const delete_task = await Task.deleteMany({user_id:_id,progress_level:100});
        res.sendStatus(200);
        next();
    }
    catch(err){
        res.status(401);
        console.log(err);
    }
}

// All Task Get Data
module.exports.all_task_get = async (req, res, next) => {
  const user = res.locals.user;
  let currentDate = new Date();
  const user_id = user._id;
  try {
    const query = await Task.find({ user_id: user_id })
    res.locals.tasks = query;
    res.locals.date = currentDate;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};
