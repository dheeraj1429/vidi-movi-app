const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexControllers");

router.get("/get-all-movies", indexController.getAllMovies);
router.get("/stream-video/:name", indexController.stremVideo);
router.get("/get-one-movie/:id", indexController.getOneMovi);
router.post("/video-history", indexController.storeHistoryVideo);
router.get("/user-history", indexController.userHistory);
router.post("/remove-user-history", indexController.removeMovieFromHistory);

module.exports = router;
