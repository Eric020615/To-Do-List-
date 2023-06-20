const express = require('express')
const app = express();
const router = express.Router();
const {requireAuth, checkUser} = require('../middleware/authMiddleware');
const task_controller = require("../controllers/taskController")
const feedback_controller = require("../controllers/feedbackController");
const user_controller = require("../controllers/userController");
const calendar_Controller = require("../controllers/calendarController");
const { getImg } = require('../controllers/userController');

// apply checkUser middleware into every single route
router.get('*', checkUser);

router.get('/',feedback_controller.feedback_get, (req,res)=>{
    res.render("intro");
});

router.get('/signup', (req,res)=>{
    res.render("signup");
});

// when user click this route, show login.ejs page to user
router.get('/login', (req,res)=>{
    res.render("login");
});

router.get('/home', requireAuth, checkUser, task_controller.home_get, (req,res)=>{
    res.render("home");
})

router.get('/task', requireAuth, task_controller.task_to_do_get, (req,res)=>{
    res.render("task to do");
})

router.get('/task-in-progress', requireAuth, task_controller.task_in_progress_get, (req,res)=>{
    res.render('task in progress');
})

router.get('/task-review', requireAuth , task_controller.all_task_get, (req,res)=>{
    const tasks = res.locals.tasks;
    res.render('task_review',{tasks});
})

router.get('/calendar', requireAuth , checkUser, calendar_Controller.calendar_get, (req,res)=>{
    const tasks = res.locals.tasks;
    res.render('calendar',{tasks});
})

router.get('/task-to-complete', requireAuth, checkUser, task_controller.task_complete_get, (req,res)=>{
    res.render('task to complete');
})

router.get('/calendar', requireAuth , (req,res)=>{
    res.render("calendar");
})

router.get('/profile', requireAuth ,checkUser, (req,res)=>{
    res.render("profile");
})

router.get('/settings', requireAuth ,checkUser, (req,res)=>{
    res.render('settings-advanced');
})

// router.get('/settings-general', requireAuth ,checkUser, (req,res)=>{
//     res.render('settings-general');
// })

router.get('/about-us', requireAuth , (req,res)=>{
    res.render('about us');
})

router.get('/feedback', requireAuth , (req,res)=>{
    res.render('feedback');
})

// export router objects
module.exports = router;