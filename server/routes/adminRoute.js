const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminControllers = require("../controllers/adminControllers");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname === "image" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            callback(null, "./uploads/thumbnail");
        } else if (
            file.mimetype === "video/mp4" ||
            file.mimetype === "video/3gpp" ||
            file.mimetype === "video/quicktime" ||
            file.mimetype === "video/x-msvideo" ||
            file.mimetype === "video/x-ms-wmv"
        ) {
            callback(null, "./uploads/videos");
        }
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).any();

router.post("/movie-upload", upload, adminControllers.moviesUpload);
router.get("/get-all-users", adminControllers.getAllUser);
router.post("/update-user-profile", adminControllers.updateUserProfile);
router.post("/delete-account", adminControllers.deleteAccount);

module.exports = router;
