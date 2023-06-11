const { Router } = require('express');
const settingsController = require('../controllers/settingsController');
const { checkUser } = require('../middleware/authMiddleware');
const router = new Router();

router.post('/change_password',checkUser,settingsController.change_password);
router.post('/verify_email',settingsController.verify_email);
router.delete('/delete_account',settingsController.delete_account);

module.exports = router;