const { Router } = require("express");
const userController = require("../controllers/userController");
const { upload } = require("../services/multer");
const { checkUser } = require("../middleware/authMiddleware");
const router = Router();

router.post("/edit-profile", userController.profile_edit);
router.post("/upload-image",checkUser,upload.single("image"), userController.uploadImg);

// router.get("/profile", userController.getImg);
module.exports = router;