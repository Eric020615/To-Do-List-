const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();

router.post("/edit-profile", userController.profile_edit);

module.exports = router;