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

// share the video with the stream data
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

// check the movie data is present into the database if the movie object is already present into the database collection then we don't want to store the movie data inside any object and array.
const isMoviesPresent = async function (collection, userId, fildName, movieId) {
    const finMovieInDb = await collection.findOne({ _id: userId }, { [fildName]: { $elemMatch: { moviesId: movieId } } });
    return finMovieInDb;
};

const storeUserHistoryFunction = async function (collection, userId, userName, movieId) {
    await collection.update(
        { _id: userId, name: userName },
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

        // varify the user is vaild or not
        const userVarify = await jwt.verify(userToken, JWT_TOKEN);
        const userId = userVarify._id;
        const userName = userVarify.name;
        const provider = userVarify.provider;

        if (provider === "google") {
            const goolgeUserMoviePresent = await isMoviesPresent(googleAuthUser, userId, "history", movieId);

            if (goolgeUserMoviePresent.history.length > 0) {
                console.log("movie is already present");
            } else {
                await storeUserHistoryFunction(googleAuthUser, userId, userName, movieId);
            }
        } else if (provider === "login") {
            const userFindInDb = await isMoviesPresent(userModel, userId, "history", movieId);

            if (userFindInDb.history.length > 0) {
                console.log("movie is already present");
            } else {
                await storeUserHistoryFunction(userModel, userId, userName, movieId);
            }
        }
    } catch (err) {
        console.log(err);
    }
};

// grab the user history data and return from the function
const getHistoryFunction = async function (collection, _id, name, req, res, target) {
    const userHistoryObjectRef = await collection.findOne({ _id, name }).populate(`${target}.moviesId`);
    if (userHistoryObjectRef.history.length === 0 || userHistoryObjectRef.history === []) {
        return res.status(200).json({ success: true, message: "No history" });
    }

    const MovieHistoryArry = [];

    if (userHistoryObjectRef) {
        userHistoryObjectRef.history.map((el) => {
            const movieObject = el.moviesId;
            MovieHistoryArry.push(movieObject);
        });
    }

    return res.status(200).json({
        success: true,
        movieHistoryObject: MovieHistoryArry,
    });
};

const userFindInCookie = async function (req, res) {
    const token = req.cookies?.user?.data?.token;

    if (!token) {
        return res.status(200).json({
            success: false,
            message: "there is no user found in session",
        });
    }
    const userVarify = await jwt.verify(token, JWT_TOKEN);
    return userVarify;
};

const userHistory = async function (req, res, next) {
    try {
        const userVarify = await userFindInCookie(req, res);

        const { _id, name, provider } = userVarify;
        let target = "history";
        // if the user is login with the google account the we want to store the history object inside the user google account object is the user login with the normal account then we want the store the history data into the user collection.
        if (provider === "google") {
            getHistoryFunction(googleAuthUser, _id, name, req, res, target);
        }

        if (provider === "login") {
            getHistoryFunction(userModel, _id, name, req, res, target);
        }
    } catch (err) {
        console.log(err);
    }
};

const removerMoviesHistoryOne = async function (collection, _id, movieSelectedId) {
    // grab the user first form the databse and remove the user collection object after that.
    await collection.updateOne({ _id }, { $pull: { history: { moviesId: movieSelectedId } } }, { new: true });
};

const removeMovieFromHistory = async function (req, res, next) {
    try {
        const { movieSelectedId } = req.body;

        if (!movieSelectedId) return res.status(400).json({ success: false, message: "please send the selected movie id" });
        let target = "history";
        const varifyUser = await userFindInCookie(req, res);
        const { _id, name, provider } = varifyUser;
        if (provider === "google") {
            removerMoviesHistoryOne(googleAuthUser, _id, movieSelectedId);
            getHistoryFunction(googleAuthUser, _id, name, req, res, target);
        }
        if (provider === "login") {
            removerMoviesHistoryOne(userModel, _id, movieSelectedId);
            getHistoryFunction(userModel, _id, name, req, res, target);
        }
    } catch (err) {
        console.log(err);
    }
};

const movieCheckFunction = async function (collection, _id, id, findMovieRef) {
    const userLikeVideoIsPresent = await collection.findOne({ _id }, { favoriteMovies: { $elemMatch: { movieId: id } } });

    if (userLikeVideoIsPresent.favoriteMovies.length <= 0) {
        await collection.update(
            { _id },
            {
                $push: {
                    favoriteMovies: [
                        {
                            movieId: findMovieRef._id,
                        },
                    ],
                },
            }
        );
    } else {
        await collection.update({ _id }, { $pull: { favoriteMovies: { movieId: findMovieRef._id } } }, { new: true });
    }
};

const likeMovies = async function (req, res, next) {
    try {
        const { id, movieVideo } = req.body;
        // find the movie by id and the movie name into the databse
        const findMovieRef = await movieModel.findOne({ _id: id, movieVideo: movieVideo });
        // read the user is the present into the session
        const varifyUser = await userFindInCookie(req, res);
        const { _id, provider } = varifyUser;
        // find the user into the databse by using the provider key
        if (provider === "google") {
            await movieCheckFunction(googleAuthUser, _id, id, findMovieRef);
        }

        if (provider === "login") {
            await movieCheckFunction(userModel, _id, id, findMovieRef);
        }
    } catch (err) {
        console.log(err);
    }
};

// send back the array of the object which is cantan all the liked movie objects
const likedMovieArrayFunction = async function (collection, _id, name, findTarget, req, res) {
    const findAllLikedMoviesInDb = await collection.findOne({ _id, name }).populate(`${findTarget}.movieId`);

    const likedMoviedArray = [];

    findAllLikedMoviesInDb[findTarget].map((el) => {
        const movieObject = el.movieId;
        likedMoviedArray.push(movieObject);
    });

    return res.status(200).json({
        success: true,
        moviesLikedObject: likedMoviedArray,
    });
};

const getAllLikeMovies = async function (req, res, next) {
    try {
        const varifyUser = await userFindInCookie(req, res);
        const { _id, name, provider } = varifyUser;
        let findTarget = "favoriteMovies";
        if (provider === "login") {
            await likedMovieArrayFunction(userModel, _id, name, findTarget, req, res);
        }

        if (provider === "google") {
            await likedMovieArrayFunction(googleAuthUser, _id, name, findTarget, req, res);
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
    userHistory,
    removeMovieFromHistory,
    likeMovies,
    getAllLikeMovies,
};
