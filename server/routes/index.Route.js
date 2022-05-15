const express = require("express");

const router = express.Router();

router.get("/", () => {
    console.log("done");
});

module.exports = router;
