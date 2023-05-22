const { Router } = require('express');
const authController = require('../controllers/authController')
const router = Router();

// submit user form in signup page
router.post('/signup',authController.signup_post);

// submit user form in login page
router.post('/login',authController.login_post);

// logout and clear the jwt cookie
router.get('/logout',authController.logout_get);

module.exports = router;