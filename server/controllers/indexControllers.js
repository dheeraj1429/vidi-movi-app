const movieModel = require("../model/Schema/MoviesSchema");
const userModel = require("../model/Schema/userSchema");
const googleAuthUser = require("../model/Schema/googleAuthSchema");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const cart = require("../cart");

const JWT_TOKEN = cart.TOKEN;

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
    const param = req.params.name;
    const range = req.headers.range;
    if (!range) {
        return res.status(400).send("Requires Range header");
    }
    const videoPath = path.join(path.dirname(__dirname), "uploads", "videos", param);
    const videoSize = fs.statSync(videoPath).size; // Parse Range

    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
};

const getOneMovi = async function (req, res, next) {
    try {
        const param = req.params.id;
        if (!param) {
            return res.status(400).send("Param is required");
        }
        const findMoviInDb = await movieModel.findOne({ _id: param });

        if (findMoviInDb) {
            return res.status(200).json({
                success: true,
                data: findMoviInDb,
            });
        }
    } catch (err) {
        console.log(err);
    }
};

// check the movie data is present into the database
const isMoviesPresent = async function (collection, userId, movieId) {
    const finMovieInDb = await collection.findOne({ _id: userId }, { history: { $elemMatch: { moviesId: movieId } } });
    return finMovieInDb;
};

const storeHistoryVideo = async function (req, res, next) {
    try {
        const { id, name, userToken } = req.body;

        // find the video into the database
        const findMovieInDatabase = await movieModel.findOne({ _id: id, name: name });
        const movieId = findMovieInDatabase._id;

        if (!findMovieInDatabase) {
            return res.status(400).json({ success: false, message: "movie is not find in database" });
        }

        if (!userToken) return res.status(400).json({ success: false, message: "user token is null" });

        const userVarify = await jwt.verify(userToken, JWT_TOKEN);
        const userId = userVarify._id;
        const userName = userVarify.name;
        const userEmail = userVarify.email;
        const provider = userVarify.provider;

        if (provider === "google") {
            const goolgeUserMoviePresent = await isMoviesPresent(googleAuthUser, userId, movieId);

            if (goolgeUserMoviePresent.history.length > 0) {
                console.log("movie is already present");
            } else {
                await googleAuthUser.update(
                    { _id: userId, name: userName, email: userEmail },
                    {
                        $push: {
                            history: [
                                {
                                    moviesId: movieId,
                                },
                            ],
                        },
                    }
                );
            }
        } else if (provider === "login") {
            const userFindInDb = await isMoviesPresent(userModel, userId, movieId);

            if (userFindInDb.history.length > 0) {
                console.log("movie is already present");
            } else {
                await userModel.update(
                    { _id: userVarify._id },
                    {
                        $push: {
                            history: [
                                {
                                    moviesId: movieId,
                                },
                            ],
                        },
                    }
                );
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAllMovies,
    stremVideo,
    getOneMovi,
    storeHistoryVideo,
};
