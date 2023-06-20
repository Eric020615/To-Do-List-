const { Router } = require('express');
const authController = require('../controllers/authController');
const { uploadImg,getImg, uploadImg1} = require('../controllers/userController');
const {upload} = require('../services/multer');
const router = Router();

// submit user form in signup page
router.post('/signup',authController.signup_post);

// submit user form in login page
router.post('/login',authController.login_post);

// logout and clear the jwt cookie
router.get('/logout',authController.logout_get);

// forgot password
router.post('/forgot-password', authController.forgot_password_post);
router.get('/forgot-password', authController.forgot_password_get);

// reset password 
router.get('/reset-password/:id/:token', authController.reset_password_get);
router.post('/reset-password/:id/:token', authController.reset_password_post);

module.exports = router;