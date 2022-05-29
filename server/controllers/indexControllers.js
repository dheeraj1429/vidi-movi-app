const movieModel = require("../model/Schema/MoviesSchema");
const fs = require("fs");

const getAllMovies = async function (req, res, next) {
    try {
        const allMoviesDataCollection = await movieModel.find();

        if (!getAllMovies) return res.status(200).json({ success: false, message: "somthing worng" });

        return res.status(200).json({
            success: true,
            allMoviesDataCollection,
        });
    } catch (err) {
        console.log(err);
    }
};

const stremVideo = function (req, res, next) {
    console.log(req.body);
};

module.exports = {
    getAllMovies,
    stremVideo,
};
