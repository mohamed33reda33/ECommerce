const router = require("express").Router();
const authController = require("../controllers/authControllers");


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgetPassword", authController.forgetPassword);
router.patch("/resetPassword/:ResetToken", authController.resetPassword);





module.exports = router;