const { Router } = require('express');
const feedbackController = require('../controllers/feedbackController')
const router = Router();
const upload = require("../middleware/upload")

router.post('/feedback',feedbackController.feedback_post);

module.exports = router;