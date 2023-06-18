const { Router } = require("express");
const taskController = require('../controllers/taskController');
const { checkUser } = require("../middleware/authMiddleware");
const router = Router();

// task to do route
router.post('/task-to-do',checkUser,taskController.task_to_do_post);
router.delete('/task-to-do',taskController.task_delete);
router.delete('/clear-all-to-do',checkUser,taskController.task_to_do_clear);
router.post('/edit-task',taskController.task_edit);
router.post('/done',taskController.task_done);

// task in progress route
router.delete('/clear-all-progress',checkUser,taskController.task_in_progress_clear);
router.post('/edit-task-in-progress',taskController.task_in_progress_edit);
router.delete('/task-in-progress',taskController.task_in_progress_dlt);
router.post('/task-in-progress',taskController.task_in_progress_done);

// task to complete route
router.delete('/task-to-complete',checkUser,taskController.task_complete_delete);

module.exports = router;