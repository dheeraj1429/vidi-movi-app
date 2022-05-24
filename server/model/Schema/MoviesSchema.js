const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
    name: { type: String, required: [true, "please enter the movie name"] },
    category: { type: String, required: [true, "please enter the category name"] },
    genra: { type: String, required: [true, "please enter the movie genra"] },
    artist: { type: String, required: [true, "please enter the artist name"] },
    Album: { type: String, required: [true, "please enter the movie album name"] },
    description: { type: String },
    licensed: { type: String, required: [true, "please enter the movie licensed"] },
    movieVideo: { type: String, required: [true, "file name is required"] },
    movieVideoPath: { type: String, required: [true, "file name is required"] },
    thumbnailName: { type: String, required: [true, "thumbnailName is required"] },
    thumbnailPath: { type: String, required: [true, "please enter the mmovie url paht"] },
});

const movieModel = new mongoose.model("movie", moviesSchema);

module.exports = movieModel;
