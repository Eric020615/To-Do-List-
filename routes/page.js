const express = require('express')
const app = express();
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("intro")
});

router.get('/signup',(req,res)=>{
    res.render("signup");
});

router.get('/login',(req,res)=>{
    res.render("login");
});

router.get('/home',(req,res)=>{
    res.render("home");
})

router.get('/task',(req,res)=>{
    res.render("task to do");
})

router.get('/task-in-progress',(req,res)=>{
    res.render('task in progress');
})

router.get('/task-review',(req,res)=>{
    res.render('task_review');
})

router.get('/task-to-complete',(req,res)=>{
    res.render('task to complete');
})

router.get('/calendar',(req,res)=>{
    res.render("calendar");
})

router.get('/profile',(req,res)=>{
    res.render("profile");
})

router.get('/settings-advanced',(req,res)=>{
    res.render('settings-advanced');
})

router.get('/settings-general',(req,res)=>{
    res.render('settings-general');
})

router.get('/about-us',(req,res)=>{
    res.render('about us');
})

router.get('/feedback',(req,res)=>{
    res.render('feedback');
})

module.exports = router;