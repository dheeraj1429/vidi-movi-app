const movieModel = require("../model/Schema/MoviesSchema");

const moviesUpload = async function (req, res, next) {
    try {
        const { name, category, genra, artist, Album, description, licensed } = req.body;
        const file = req.files;

        const videoFileName = file[0].filename;
        const videoPath = file[0].path;
        const thumbnailFileName = file[1].filename;
        const thumbnailpath = file[1].path;

        const findMovieInDb = await movieModel.findOne({
            movieVideo: videoFileName,
            movieVideoPath: videoPath,
        });

        if (findMovieInDb) {
            return res.status(200).json({
                success: true,
                message: "file is already present",
            });
        } else {
            const movieUpload = await movieModel({
                name,
                category,
                genra,
                artist,
                Album,
                description,
                licensed,
                movieVideo: videoFileName,
                movieVideoPath: videoPath,
                thumbnailName: thumbnailFileName,
                thumbnailPath: thumbnailpath,
            });

            const movieRef = await movieUpload.save();

            if (movieRef) {
                return res.status(200).json({
                    success: true,
                    message: "file uplod successful",
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    moviesUpload,
};
