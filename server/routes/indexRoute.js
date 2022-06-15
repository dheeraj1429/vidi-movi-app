const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexControllers");

router.get("/get-all-movies", indexController.getAllMovies);
router.get("/stream-video/:name", indexController.stremVideo);
router.get("/get-one-movie/:id", indexController.getOneMovi);
router.post("/video-history", indexController.storeHistoryVideo);
router.get("/user-history", indexController.userHistory);
router.post("/remove-user-history", indexController.removeMovieFromHistory);
router.post("/like-movies", indexController.likeMovies);
router.get("/get-all-liked-moves", indexController.getAllLikeMovies);
router.post("/video-views", indexController.videoViewsFunction);
router.post("/user-play-list-video", indexController.userPlayListVideoFunction);
router.get("/get-user-playlist", indexController.grabUserPlayList);
router.get("/movies-name-search/:name", indexController.getSearchMovie);

module.exports = router;
