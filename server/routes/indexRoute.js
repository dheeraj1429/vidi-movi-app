const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexControllers");
const { route } = require("./adminRoute");

router.get("/get-all-movies", indexController.getAllMovies);
router.get("/stream-video/:name", indexController.streamVideo);
router.get("/get-one-movie/:id", indexController.getOneMovi);
router.post("/video-history", indexController.storeHistoryVideo);
router.get("/user-history", indexController.userHistory);
router.post("/remove-user-history", indexController.removeMovieFromHistory);
router.post("/like-movies", indexController.likeMovies);
router.get("/get-all-liked-movies", indexController.getAllLikeMovies);
router.patch("/video-views", indexController.videoViewsFunction);
router.get("/movies-name-search/:name", indexController.getSearchMovie);
router.get("/get-all-search-movies/:searchQuery", indexController.getAllSearchMovies);
router.patch("/delete-like-video", indexController.deleteLikeVideoFromDB);
router.patch("/delete-user-all-history", indexController.deleteUserAllHistory);
router.patch("/delete-all-selected-history", indexController.removeAllSelectedMovies);
router.get("/get-movies-comments/:id", indexController.getMoivesComments);

module.exports = router;
