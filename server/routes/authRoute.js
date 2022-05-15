const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.post("/signIn", authControllers.signInUser);

module.exports = router;
