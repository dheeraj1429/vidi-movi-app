const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.post("/signIn", authControllers.signInUser);
router.post("/logIn", authControllers.logInUser);
router.post("/forget-password", authControllers.forgetPassword);
router.post("/user/forget-request", authControllers.resetPasswordRequest);

module.exports = router;
