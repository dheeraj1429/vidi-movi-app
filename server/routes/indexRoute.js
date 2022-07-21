const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexControllers");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image.jpg" ||
            file.mimetype === "image/png"
        ) {
            if (file.fieldname === "file") {
                cb(null, "./uploads/userProfileImages");
            } else {
                cb(null, "./uploads/UserProfileBannerImage");
            }
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).any();

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
router.post("/insert-new-movie-comment", indexController.inertNewMovieComment);
router.get("/get-movies-comments/:id", indexController.getMoivesComments);
router.post("/user-like-movies-comments", indexController.userLikeMovieComments);
router.post("/user-movies-comments-report", indexController.movieCommentReport);
router.get("/get-login-user/:id", indexController.getLoginUser);
router.post("/update-user-profile", upload, indexController.updateUserProfile);
router.post("/update-user-profile-banner", upload, indexController.updateUserProfileBanner);

module.exports = router;
