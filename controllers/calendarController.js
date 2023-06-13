// import Task model
const Task = require('../models/Task');

// All Task Get Data
module.exports.calendar_get = async (req, res, next) => {
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