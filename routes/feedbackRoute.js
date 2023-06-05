const { Router } = require('express');
const feedbackController = require('../controllers/feedbackController')
const router = Router();

router.post('/feedback',feedbackController.feedback_post);

module.exports = router;