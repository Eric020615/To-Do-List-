const { Router } = require("express");
const taskController = require('../controllers/taskController');
const { checkUser } = require("../middleware/authMiddleware");
const router = Router();

router.post('/task-to-do',checkUser,taskController.task_to_do_post);

module.exports = router;