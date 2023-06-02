const { Router } = require("express");
const taskController = require('../controllers/taskController');
const { checkUser } = require("../middleware/authMiddleware");
const router = Router();

// task to do route
router.post('/task-to-do',checkUser,taskController.task_to_do_post);
router.delete('/task-to-do',taskController.task_delete);
router.post('/edit-task',taskController.task_edit);
router.post('/done',taskController.task_done);

// task to complete route
router.delete('/task-to-complete',checkUser,taskController.task_complete_delete);

module.exports = router;