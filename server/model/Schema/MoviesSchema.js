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
    activity: [{ like: { type: String }, dislike: { type: String } }],
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    comments: [
        {
            googleUserId: { type: mongoose.Types.ObjectId, ref: "authUser" },
            logInUserId: { type: mongoose.Types.ObjectId, ref: "user" },
            comment: { type: String, required: [true, "user comment is required"] },
            commentUId: { type: String, required: [true, "plase enter the uid"] },
            commentTime: { type: String },
            likeCount: { type: Number, default: 0 },
            likedUsers: [
                { googleUserId: { type: mongoose.Types.ObjectId, ref: "authUser" }, logInUserId: { type: mongoose.Types.ObjectId, ref: "user" } },
            ],
        },
    ],
    commentReports: [
        {
            googleUserReportId: { type: mongoose.Types.ObjectId, ref: "authUser" },
            loginUserReportId: { type: mongoose.Types.ObjectId, ref: "user" },
            report: { type: Array },
            reportCommentId: { type: mongoose.Types.ObjectId, ref: "movie" },
        },
    ],
});

const movieModel = new mongoose.model("movie", moviesSchema);

module.exports = movieModel;
