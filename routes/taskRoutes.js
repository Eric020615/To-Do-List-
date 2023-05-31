const { Router } = require("express");
const taskController = require('../controllers/taskController');
const { checkUser } = require("../middleware/authMiddleware");
const router = Router();

router.post('/task-to-do',checkUser,taskController.task_to_do_post);
router.delete('/delete-task',taskController.task_delete);
router.post('/edit-task',taskController.task_edit);
// router.post('/done',taskController.task_done);

module.exports = router;