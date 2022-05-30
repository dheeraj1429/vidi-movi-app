const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexControllers");

router.post("/get-all-movies", indexController.getAllMovies);
router.get("/stream-video/:name", indexController.stremVideo);
router.post("/get-one-movie/:id", indexController.getOneMovi);

module.exports = router;
