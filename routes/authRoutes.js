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

// router.post('/upload',upload.single('image'),uploadImg);

// router.get('/getImage',getImg);

module.exports = router;