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
const getHistoryFunction = async function (collection, _id, name, req, res, target, returnData = undefined) {
    const userHistoryObjectRef = await collection.findOne({ _id }).populate(`${target}.moviesId`);
    if (userHistoryObjectRef[`${target}`].length === 0) {
        return res.status(200).json({ success: true, message: returnData !== undefined && returnData.message ? returnData.message : "no history" });
    }

    // const genrateName = () => (returnData !== undefined && returnData !== null && returnData.arrayName ? returnData.arrayName : "movieHistoryObject");
    // const fildName = genrateName();

    return res.status(200).json({
        success: true,
        [`${returnData.arrayName}`]: userHistoryObjectRef.history,
    });

    /*
    // const MovieHistoryArry = [];
    // const playListArray = [];

    // if (userHistoryObjectRef) {
    //     userHistoryObjectRef[`${target}`].map((el) => {
    //         const movieObject = el.moviesId;
    //         if (returnData !== undefined && returnData.arrayName !== null && returnData.arrayName) {
    //             playListArray.unshift(movieObject);
    //         } else {
    //             MovieHistoryArry.unshift(movieObject);
    //         }
    //     });
    // }

    // return res.status(200).json({
    //     success: true,
    //     [`${fildName}`]: returnData !== null && returnData.arrayName ? playListArray : MovieHistoryArry,
    // });
    */
};

const userFindInCookie = async function (req, res, userToken) {
    const token = req.cookies?.user?.data?.token;

    if (!token) {
        return res.status(200).json({
            success: false,
            message: "there is no user found in session",
        });
    }
    const userVarify = await jwt.verify(userToken ? userToken : token, JWT_TOKEN);
    return userVarify;
};

const userHistory = async function (req, res, next) {
    try {
        const userVarify = await userFindInCookie(req, res);

        const { _id, name, provider } = userVarify;
        let target = "history";
        const returnData = {
            arrayName: "movieHistoryObject",
            message: "no history",
        };
        // if the user is login with the google account the we want to store the history object inside the user google account object is the user login with the normal account then we want the store the history data into the user collection.
        if (provider === "google") {
            getHistoryFunction(googleAuthUser, _id, name, req, res, target, returnData);
        }

        if (provider === "login") {
            getHistoryFunction(userModel, _id, name, req, res, target, returnData);
        }
    } catch (err) {
        console.log(err);
    }
};

const removerMoviesHistoryOne = async function (collection, _id, movieSelectedId, req, res) {
    // grab the user first form the databse and remove the user collection object after that.
    const removerRef = await collection.updateOne({ _id }, { $pull: { history: { moviesId: movieSelectedId } } }, { new: true });

    if (!!removerRef.modifiedCount) {
        return res.status(200).json({
            success: true,
        });
    }
};

const removeMovieFromHistory = async function (req, res, next) {
    try {
        const { movieSelectedId } = req.body;

        if (!movieSelectedId) return res.status(400).json({ success: false, message: "please send the selected movie id" });
        let target = "history";
        const varifyUser = await userFindInCookie(req, res);
        const { _id, name, provider } = varifyUser;
        const returnData = {
            arrayName: "movieHistoryObject",
            message: "no history",
        };
        if (provider === "google") {
            removerMoviesHistoryOne(googleAuthUser, _id, movieSelectedId, req, res);
            // getHistoryFunction(googleAuthUser, _id, name, req, res, target, returnData);
        }
        if (provider === "login") {
            removerMoviesHistoryOne(userModel, _id, movieSelectedId, req, res);
            // getHistoryFunction(userModel, _id, name, req, res, target, returnData);
        }
    } catch (err) {
        console.log(err);
    }
};

const movieCheckFunction = async function (collection, _id, id, findMovieRef, target) {
    const userLikeVideoIsPresent = await collection.findOne({ _id }, { [`${target}`]: { $elemMatch: { moviesId: id } } });

    if (userLikeVideoIsPresent[`${target}`].length <= 0) {
        const insertDataRef = await collection.update(
            { _id },
            {
                $push: {
                    [`${target}`]: [
                        {
                            moviesId: findMovieRef._id,
                        },
                    ],
                },
            }
        );

        if (insertDataRef.acknowledged === true) {
            return { data: "added" };
        }
    } else {
        const removerDataRef = await collection.update({ _id }, { $pull: { [`${target}`]: { moviesId: findMovieRef._id } } }, { new: true });
        if (removerDataRef.acknowledged === true) {
            return { data: "remove" };
        }
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
        const target = "favoriteMovies";

        const responserFn = function (playListFn) {
            if (playListFn.data === "remove") {
                return res.status(200).json({
                    success: false,
                    message: "movie unliked",
                });
            }
            if (playListFn.data === "added") {
                return res.status(200).json({
                    success: true,
                    message: "movie liked",
                });
            }
        };

        // find the user into the databse by using the provider key
        if (provider === "google") {
            const userLikeRef = await movieCheckFunction(googleAuthUser, _id, id, findMovieRef, target);
            responserFn(userLikeRef);
        }

        if (provider === "login") {
            const userLikeRef = await movieCheckFunction(userModel, _id, id, findMovieRef, target);
            responserFn(userLikeRef);
        }
    } catch (err) {
        console.log(err);
    }
};

// send back the array of the object which is cantan all the liked movie objects
const likedMovieArrayFunction = async function (collection, _id, name, findTarget, req, res) {
    const findAllLikedMoviesInDb = await collection.findOne({ _id, name }).populate(`${findTarget}.moviesId`);

    return res.status(200).json({
        success: true,
        moviesLikedObject: findAllLikedMoviesInDb.favoriteMovies,
    });

    // const likedMoviedArray = [];

    // findAllLikedMoviesInDb[findTarget].map((el) => {
    //     const movieObject = el.moviesId;
    //     likedMoviedArray.unshift(movieObject);
    // });

    // return res.status(200).json({
    //     success: true,
    //     moviesLikedObject: likedMoviedArray,
    // });
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

const videoViewsFunction = async function (req, res, next) {
    try {
        const { id, name } = req.body;
        movieModel
            .findOne({ _id: id, name })
            .then((response) => {
                movieModel
                    .updateOne({ _id: response._id, name: response.name }, { $set: { views: response.views + 1 } })
                    .then((result) => {
                        if (result.modifiedCount === 1) {
                            console.log("video view is inc");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
};

const userPlayListVideoFunction = async function (req, res, next) {
    try {
        const { id, userToken } = req.body;
        const varifyUser = await userFindInCookie(req, res, userToken);
        const userData = {
            userId: varifyUser._id,
            userName: varifyUser.name,
            userEmail: varifyUser.email,
        };

        const findMovieRef = await movieModel.findOne({ _id: id });
        const provider = varifyUser.provider;
        const target = "moviesPlayList";
        const responserFn = function (playListFn) {
            if (playListFn.data === "remove") {
                return res.status(200).json({
                    success: false,
                    message: "movie remove from the playlist",
                });
            }
            if (playListFn.data === "added") {
                return res.status(200).json({
                    success: true,
                    message: "movie added into the playlist",
                });
            }
        };

        if (provider === "google") {
            const playListFn = await movieCheckFunction(googleAuthUser, userData.userId, id, findMovieRef, target);
            responserFn(playListFn);
        }

        if (provider === "login") {
            const playListFn = await movieCheckFunction(userModel, userData.userId, id, findMovieRef, target);
            responserFn(playListFn);
        }
    } catch (err) {
        console.log(err);
    }
};

const grabUserPlayList = async function (req, res, next) {
    try {
        const userVarify = await userFindInCookie(req, res);
        const { _id, name, provider } = userVarify;
        const returnData = {
            arrayName: "userPlayLists",
            message: "no playlist",
        };
        let target = "moviesPlayList";
        if (provider === "google") {
            getHistoryFunction(googleAuthUser, _id, name, req, res, target, returnData);
        }
        if (provider === "login") {
            getHistoryFunction(userModel, _id, name, req, res, target, returnData);
        }
    } catch (err) {
        console.log(err);
    }
};

const updateTheUserVideoData = async function (collection, req, res, data) {
    try {
        // grab the video from the databse which is store into the user collection object. then update the targe video duration.
        await collection.updateOne(
            { _id: data.id, name: data.name, "history.moviesId": data.movieId },
            {
                $set: {
                    "history.$.videoCurrentTime": data.videoWatchTime,
                },
            }
        );
    } catch (err) {
        console.log(err);
    }
};

const updateVideoCurrentTime = async function (req, res, next) {
    try {
        const { videoWatchTime, movie } = req.body;
        const userVarify = await userFindInCookie(req, res);
        const { _id, name, provider } = userVarify;

        const data = {
            id: _id,
            name: name,
            movieId: movie,
            videoWatchTime,
        };

        if (provider === "google") {
            await updateTheUserVideoData(googleAuthUser, req, res, data);
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
    videoViewsFunction,
    userPlayListVideoFunction,
    grabUserPlayList,
    updateVideoCurrentTime,
};
