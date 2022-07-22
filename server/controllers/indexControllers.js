const movieModel = require("../model/Schema/MoviesSchema");
const userModel = require("../model/Schema/userSchema");
const googleAuthUser = require("../model/Schema/googleAuthSchema");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const cart = require("../cart");
const userFindInCookie = require("../helpers/varifyUser");
const sharp = require("sharp");
const compressImage = require("../helpers/compressImages");
const JWT_TOKEN = cart.TOKEN;

const getAllMovies = async function (req, res, next) {
    try {
        /**
         * @allMoviesDataCollection find all movies from the database
         * @return all the movies document collection
         */
        const allMoviesDataCollection = await movieModel.find();

        if (!getAllMovies)
            return res.status(200).json({ success: false, message: "somthing worng" });

        return res.status(200).json({
            success: true,
            allMoviesDataCollection,
        });
    } catch (err) {
        console.log(err);
    }
};

const streamVideo = function (req, res, next) {
    /* ---------------------------- Create a Stream Video Pipe ----------------------- */
    /**
     * @param url string query
     * @range how much data we want to send back to the client
     */
    const param = req.params.name;
    const range = req.headers.range;

    if (!range) {
        return res.status(400).send("Requires Range header");
    }

    /**
     * @videoPath path
     * @CHUNK_SIZE how much data we want to send back the client for each request 1mb
     * @videoStream connect the video with the stream pipe line
     * @return stream video
     */

    const videoPath = path.join(path.dirname(__dirname), "uploads", "videos", param);
    const videoSize = fs.statSync(videoPath).size; // Parse Range

    const CHUNK_SIZE = 10 ** 6;
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

    /**
     * @res HTTP Status 206 for Partial Content
     * @videoStream create video read stream for this particular chunk
     * @videoStream Stream the video chunk to the client
     */

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
};

/**
 * @param  { googleAuthUser, userModel } collection
 * @param  { ObjectId } _id
 * @param  { movieModel } param selected movie name
 * @param  { Object } res
 */
const checkMovieIsLikedByUser = async function (collection, _id, param, findMoviInDb, res) {
    const findUserLikeVideo = await collection.findOne(
        { _id },
        { favoriteMovies: { $elemMatch: { moviesId: param } } }
    );

    if (!!findUserLikeVideo.favoriteMovies.length) {
        return res.status(200).json({
            success: true,
            data: findMoviInDb,
            isMovieLiked: true,
        });
    } else {
        return res.status(200).json({
            success: true,
            data: findMoviInDb,
            isMovieLiked: false,
        });
    }
};

const getOneMovi = async function (req, res, next) {
    /* ----------------------------- selected strem movie from the databse ------------------------- */
    /* grab the movie from the database. Find the user and then varify the user is valid or not if there is not user the we want to send back only the selected movie, and if the user is prenset then we want to check the user document if the movie is liked by user or not and send back the response with true and false value.
     */
    try {
        const param = req.params.id;
        const token = req.cookies?.user?.data?.token;

        if (!param) {
            return res.status(400).send("Param is required");
        }

        /**
         * @findMoviInDb data collection and information about selected movie
         */
        const findMoviInDb = await movieModel.findOne({ _id: param });

        if (token) {
            const userVarify = await jwt.verify(token, JWT_TOKEN);
            const { _id, provider } = userVarify;

            if (provider === "google") {
                await checkMovieIsLikedByUser(googleAuthUser, _id, param, findMoviInDb, res);
            }

            if (provider === "login") {
                await checkMovieIsLikedByUser(userModel, _id, param, findMoviInDb, res);
            }
        } else {
            res.status(200).json({
                success: true,
                data: findMoviInDb,
                isMovieLiked: false,
            });
        }
    } catch (err) {
        console.log(err);
    }
};

/**
 *
 * @param {*} collection which collection we want the find the data
 * @param {*} userId login user information
 * @param {*} fildName which filde we want the match the data
 * @param {*} movieId selected movie id
 * @returns check the movie data is present into the database if the movie object is already present into the database collection then we don't want to store the movie data inside any object and array.
 */
const isMoviesPresent = async function (collection, userId, fildName, movieId) {
    const finMovieInDb = await collection.findOne(
        { _id: userId },
        { [fildName]: { $elemMatch: { moviesId: movieId } } }
    );
    return finMovieInDb;
};

/**
 *
 * @param {*} collection
 * @param {*} data information about user and selected video
 * @return store the selected movies into the user document
 */
const storeUserHistoryFunction = async function (collection, data) {
    await collection.update(
        { _id: data.userId, name: data.userName },
        {
            $push: {
                history: [
                    {
                        moviesId: data.movieId,
                        videoCurrentTime: data.videoWatchTime,
                    },
                ],
            },
        }
    );
};

/**
 *
 * @param {*} collection
 * @param {*} req
 * @param {*} res
 * @param {*} data information about user and selected video
 * @return grab the video from the databse which is store into the user collection object. then update the targe video duration.
 */
const updateTheUserVideoData = async function (collection, data) {
    try {
        await collection.updateOne(
            { _id: data.userId, name: data.userName, "history.moviesId": data.movieId },
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

const storeHistoryVideo = async function (req, res, next) {
    try {
        const { id, name, userToken, videoWatchTime } = req.body;

        /**
         * @findMovieInDatabase find the selected movie video into the database
         */
        const findMovieInDatabase = await movieModel.findOne({ _id: id, name: name });
        const movieId = findMovieInDatabase._id;

        if (!findMovieInDatabase) {
            return res
                .status(200)
                .json({ success: false, message: "movie is not find in database" });
        }

        if (!userToken)
            return res.status(200).json({ success: false, message: "user token is null" });

        /**
         * @userVarifyvarify the user is vaild or not
         * @param  { string } userToken user login token to find which user is request in server
         * @param  { string } userName
         * @param  { string } provider
         */
        const userVarify = await jwt.verify(userToken, JWT_TOKEN);
        const userId = userVarify._id;
        const userName = userVarify.name;
        const provider = userVarify.provider;

        const data = {
            userId,
            userName,
            movieId,
            videoWatchTime,
        };

        if (provider === "google") {
            const goolgeUserMoviePresent = await isMoviesPresent(
                googleAuthUser,
                userId,
                "history",
                movieId
            );

            if (!!goolgeUserMoviePresent.history.length) {
                await updateTheUserVideoData(googleAuthUser, data);
            } else {
                await storeUserHistoryFunction(googleAuthUser, data);
            }
        } else if (provider === "login") {
            const userFindInDb = await isMoviesPresent(userModel, userId, "history", movieId);

            if (!!userFindInDb.history.length) {
                await updateTheUserVideoData(userModel, data);
            } else {
                await storeUserHistoryFunction(userModel, data);
            }
        }
    } catch (err) {
        console.log(err);
    }
};

const getHistoryFunction = async function (collection, _id, res, target, returnData) {
    /**
     * @userHistory grab the user history data
     */
    const userHistory = await collection.findOne({ _id }).populate(`${target}.moviesId`);

    if (userHistory) {
        return res.status(200).json({
            success: true,
            [`${returnData.arrayName}`]: userHistory.history,
        });
    }
};

const userHistory = async function (req, res, next) {
    try {
        const userVarify = await userFindInCookie(req, res);
        const { _id, provider } = userVarify;
        let target = "history";

        const returnData = {
            arrayName: "movieHistoryObject",
            message: "no history",
        };

        /**
         * @provider if the user is login with the google account the we want to store the history object inside the user google account object is the user login with the normal account then we want the store the history data into the user collection.
         */
        if (provider === "google") {
            getHistoryFunction(googleAuthUser, _id, res, target, returnData);
        }

        if (provider === "login") {
            getHistoryFunction(userModel, _id, res, target, returnData);
        }
    } catch (err) {
        console.log(err);
    }
};

const removerMoviesHistoryOne = async function (collection, _id, movieSelectedId, res) {
    /**
     * @removeUserHistoryVideo  grab the user first form the databse and remove the user collection object after that.
     */
    const removeUserHistoryVideo = await collection.updateOne(
        { _id },
        { $pull: { history: { moviesId: movieSelectedId } } },
        { new: true }
    );

    if (!!removeUserHistoryVideo.modifiedCount) {
        return res.status(200).json({
            success: true,
        });
    }
};

const removeMovieFromHistory = async function (req, res, next) {
    try {
        const { movieSelectedId } = req.body;

        if (!movieSelectedId)
            return res
                .status(400)
                .json({ success: false, message: "please send the selected movie id" });
        const varifyUser = await userFindInCookie(req, res);
        const { _id, provider } = varifyUser;

        if (provider === "google") {
            await removerMoviesHistoryOne(googleAuthUser, _id, movieSelectedId, res);
        }
        if (provider === "login") {
            await removerMoviesHistoryOne(userModel, _id, movieSelectedId, res);
        }
    } catch (err) {
        console.log(err);
    }
};

const movieCheckFunction = async function (collection, _id, id, findMovieRef, target) {
    /**
     * @userLikeVideoIsPresent check the movie is exist into the user like document
     * @insertDataRef if the movie is not exist in the user document the insert the new object which is contains information about movie
     * @removerDataRef if the movie is exist in the user collection then remove the movie
     */
    const userLikeVideoIsPresent = await collection.findOne(
        { _id },
        { [`${target}`]: { $elemMatch: { moviesId: id } } }
    );

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
        const removerDataRef = await collection.update(
            { _id },
            { $pull: { [`${target}`]: { moviesId: findMovieRef._id } } },
            { new: true }
        );
        if (removerDataRef.acknowledged === true) {
            return { data: "remove" };
        }
    }
};

const likeMovies = async function (req, res, next) {
    try {
        /**
         * @findMovieRef find the movie by id and the movie name into the databse
         * @varifyUser read the user is the present into the session
         */
        const { id, movieVideo } = req.body;
        const findMovieRef = await movieModel.findOne({ _id: id, movieVideo: movieVideo });
        const varifyUser = await userFindInCookie(req, res);
        const { _id, provider } = varifyUser;
        const target = "favoriteMovies";

        // find the user into the databse by using the provider key
        if (provider === "google") {
            await movieCheckFunction(googleAuthUser, _id, id, findMovieRef, target);
        }

        if (provider === "login") {
            await movieCheckFunction(userModel, _id, id, findMovieRef, target);
        }
    } catch (err) {
        console.log(err);
    }
};

const likedMovieArrayFunction = async function (collection, _id, findTarget, res) {
    /**
     * @findAllLikedMoviesInDb get the all user like movies
     * @return send back the array of the object which is cantan all the liked movie objects
     */
    const findAllLikedMoviesInDb = await collection
        .findOne({ _id })
        .populate(`${findTarget}.moviesId`);

    return res.status(200).json({
        success: true,
        moviesLikedObject: findAllLikedMoviesInDb.favoriteMovies,
    });
};

const getAllLikeMovies = async function (req, res, next) {
    try {
        const varifyUser = await userFindInCookie(req, res);
        const { _id, provider } = varifyUser;

        let findTarget = "favoriteMovies";

        if (provider === "login") {
            await likedMovieArrayFunction(userModel, _id, findTarget, res);
        }

        if (provider === "google") {
            await likedMovieArrayFunction(googleAuthUser, _id, findTarget, res);
        }
    } catch (err) {
        console.log(err);
    }
};

const videoViewsFunction = async function (req, res, next) {
    try {
        const { id, name } = req.body;

        /**
         * @result increse the video views
         */

        movieModel
            .findOne({ _id: id, name })
            .then((response) => {
                movieModel
                    .updateOne(
                        { _id: response._id, name: response.name },
                        { $set: { views: response.views + 1 } }
                    )
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

const getSearchMovie = async function (req, res, next) {
    try {
        const movieName = req.params.name;
        const findMoviesData = await movieModel.find(
            { name: { $regex: movieName, $options: "i" } },
            { name: 1 }
        );

        if (!findMoviesData) {
            return res.status(500).json({
                success: true,
                message: "somthing worng",
            });
        }

        return res.status(200).json({ findMoviesData });
    } catch (err) {
        console.log(err);
    }
};

const getAllSearchMovies = async function (req, res, next) {
    try {
        /**
         * @param { String } searchQuery
         * @searchMoviesRef find the movie name from the database using the search query string
         */
        const { searchQuery } = req.params;

        if (!searchQuery) return res.status(200).json({ message: "somthing worng" });

        const searchMoviesRef = await movieModel.find({
            name: { $regex: searchQuery, $options: "i" },
        });

        if (!!searchMoviesRef.length) {
            return res.status(200).json({ searchMoviesRef });
        }
    } catch (err) {
        console.log(err);
    }
};

const findMovieAndRemoveFn = async function (req, res, data, collection) {
    /**
     * @findRef find the movie into the document
     * @return remove the find movie from the document
     */
    const findRef = await collection.updateOne(
        { _id: data.userId },
        { $pull: { favoriteMovies: { moviesId: data.movieId } } },
        { new: true }
    );

    if (!!findRef.modifiedCount) {
        await likedMovieArrayFunction(collection, data.userId, data.name, data.target, res);
    }
};

const deleteLikeVideoFromDB = async function (req, res, next) {
    try {
        /**
         * @userVarify user information which user is request fro the data
         */
        const { movieId } = req.body;
        const userVarify = await userFindInCookie(req, res);
        const { _id, name, provider } = userVarify;

        const data = {
            userId: _id,
            movieId,
            name,
            target: "favoriteMovies",
        };

        if (provider === "google") {
            await findMovieAndRemoveFn(req, res, data, googleAuthUser);
        }

        if (provider === "login") {
            await findMovieAndRemoveFn(req, res, data, userModel);
        }
    } catch (err) {
        console.log(err);
    }
};

const removeAllUserHistoryFn = async function (collection, data, res) {
    const userHistory = await collection.updateOne(
        { _id: data._id, name: data.name },
        { $pull: { history: {} } }
    );

    if (userHistory.modifiedCount) {
        return res.status(200).json({
            success: true,
        });
    }
};

const deleteUserAllHistory = async function (req, res, next) {
    try {
        /**
         * @userVarify varify the user which user are request in server
         */
        const userVarify = await userFindInCookie(req, res);
        const { _id, name, provider } = userVarify;

        const data = {
            _id,
            name,
        };

        if (provider === "google") {
            await removeAllUserHistoryFn(googleAuthUser, data, res);
        }

        if (provider === "login") {
            await removeAllUserHistoryFn(userModel, data, res);
        }
    } catch (err) {
        console.log(err);
    }
};

/**
 *
 * @param { googleAuthUser, userModel } collection
 * @param { Object } data
 */
const removeVideosFromHistory = async function (collection, data) {
    let userHistoryFind;

    /**
     * @for loop over the user selected id and then remove all the movies from this history object
     * @return { boolean } success
     */
    for (let i = 0; i < data.moviesId.length; i++) {
        userHistoryFind = await collection.updateOne(
            { _id: data._id },
            { $pull: { history: { moviesId: data.moviesId[i] } } }
        );
    }

    if (userHistoryFind.modifiedCount) {
        data.res.status(200).json({
            success: true,
        });
    }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns finding the movie inside the user document and the remove the selected movie..
 */
const removeAllSelectedMovies = async function (req, res, next) {
    try {
        const { moviesId, token } = req.body;

        if (token) {
            const varifyUser = await jwt.verify(token, JWT_TOKEN);
            const { _id, provider } = varifyUser;

            const data = {
                moviesId,
                res,
                _id,
            };

            if (provider === "google") {
                await removeVideosFromHistory(googleAuthUser, data);
            }

            if (provider === "login") {
                await removeVideosFromHistory(userModel, data);
            }
        } else {
            return res.status(200).json({
                message: "user must login ",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const inertNewMovieComment = async function (req, res, next) {
    try {
        const { id, name, user, comment } = req.body;

        /**
         * @varifyUser varify the user is login or not
         * @uid genrate the id for the current insented comment
         * @movieCommentInsert insert the data into the datbase
         * @return if the data is insterted then return back the succes message
         */
        const varifyUser = await jwt.verify(user, JWT_TOKEN);
        const { _id, provider } = varifyUser;

        const uId =
            new Date().getTime().toString() +
            new Date().getYear().toString() +
            new Date().getSeconds().toString() +
            Math.random().toString(32).slice(2);

        const commentTime = new Date().toLocaleString();

        const movieCommentInsert = await movieModel.updateOne(
            { _id: id, name },
            {
                $push: {
                    comments: {
                        [`${provider === "google" ? "googleUserId" : "logInUserId"}`]: _id,
                        comment: comment,
                        commentUId: uId,
                        commentTime,
                    },
                },
            }
        );

        if (!!movieCommentInsert.modifiedCount) {
            return res.status(200).json({
                success: true,
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const getMoivesComments = async function (req, res, next) {
    try {
        const { id: movieId } = req.params;

        /**
         * @userComments first find the movie from the database and the get all the comments.
         * @return { Object } comments object
         */
        const userComments = await movieModel
            .findOne({ _id: movieId })
            .populate("comments.googleUserId", {
                name: 1,
                email: 1,
                imageUrl: 1,
                uploadCustomProfileImage: 1,
            })
            .populate("comments.logInUserId", {
                name: 1,
                email: 1,
                imageUrl: 1,
                uploadCustomProfileImage: 1,
            });

        res.status(200).json({
            userComments,
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 *
 * @param { googleAuthUser, userModel } collection
 * @param { Object } res
 * @param { Object } data
 * when the user clike one the like button we want to get the all information about user like user token user id, we also want current movie id and the comment id to find which comment we are liked. and which comment like button we are click. once we get the all data. we want to check if user already liked the comment. if user already like the comment then decress the like count -1 if not +1. we also check the comment is exist in the user collection ( googleLoginUser document collection , loginUser document collection ), if the comment if aready exist into the user document collection then we want to remove the document from the user likedComment collection. 1 - wen the user click the like button store the data information into the movie comment document, in future we want to check which user is liked the comment, and find the user from database. also we want to store the user comment data into the user document ( login document ) for checking which comment user is liked. 2 - if the comment is exist and user click on the like button again then remove the comment from the user document,  alos we want to decress the comment count - 1 and remove the user from the movie comment document.....
 * @returns { Object } include message 'remove / added'
 */

const updateMovieCollectionComment = async function (data, event) {
    await movieModel.updateOne(
        { _id: data.movieId, "comments._id": data.commentId },
        {
            [`$${event}`]: {
                "comments.$.likedUsers": {
                    [data.userIdentity === "google" ? "googleUserId" : "logInUserId"]: data._id,
                },
            },
        }
    );
};

const updateUserCollectionCommnet = async function (data, collection, event) {
    await collection.updateOne(
        { _id: data._id },
        {
            [`$${event}`]: {
                likeComments: {
                    [data.userIdentity === "google" ? "googleUserCommnetId" : "loginUserCommnetId"]:
                        data.commentId,
                },
            },
        }
    );
};

const likeAndUnlikeUserCommnets = async function (collection, res, data) {
    try {
        console.log(data);

        /**
         * @insertCommentIntoTheUserCollection check the comment is exist in user collection liked comment document or not
         * @updateUserCollectionCommnet inser and remove selected comment from the user collection.
         * @updateMovieCollectionComment insert and remove selected comment from the movie colelctions.
         */
        const insertCommentIntoTheUserCollection = await collection.findOne(
            { _id: data._id },
            {
                likeComments: {
                    $elemMatch: {
                        [data.userIdentity === "google"
                            ? "googleUserCommnetId"
                            : "loginUserCommnetId"]: data.commentId,
                    },
                },
            }
        );

        if (!!insertCommentIntoTheUserCollection.likeComments.length) {
            updateUserCollectionCommnet(data, collection, "pull");
            updateMovieCollectionComment(data, "pull");

            return res.status(200).json({
                message: "remove",
            });
        } else {
            updateUserCollectionCommnet(data, collection, "push");
            updateMovieCollectionComment(data, "push");

            return res.status(200).json({
                message: "added",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const userLikeMovieComments = async function (req, res, next) {
    try {
        /**
         * @userToken user login access token
         * @moviId Id
         * @commentId id
         * @userIdentity user is login with google or login with name gmail and password
         * @likeAndUnlikeUserCommnets find the movie comment and then insert the new document
         */
        const { userToken, movieId, commentId, userIdentity } = req.body;

        const varifyUser = await jwt.verify(userToken, JWT_TOKEN);
        const { _id, provider } = varifyUser;

        data = {
            movieId,
            commentId,
            userIdentity,
            _id,
        };

        if (provider === "google") {
            await likeAndUnlikeUserCommnets(googleAuthUser, res, data);
        } else {
            await likeAndUnlikeUserCommnets(userModel, res, data);
        }
    } catch (err) {
        console.log(err);
    }
};

const movieCommentReport = async function (req, res, next) {
    try {
        /**
         * @param { Object } selectedData = { current stream video, video comment id, current login user }
         * @report [] all user commented report
         * @userReportId login user id
         * @userReportProvider login user proivder google or login
         */
        const { selectedData, report, userReportId, userReportProvider } = req.body;

        /**
         * @findeMovieCommentReportDocument check the user is already report
         * @insertUserRequestReport insert the user report request if the user is already report then user is not allow to report after 24hours user can report any commnet..
         */
        const findeMovieCommentReportDocument = await movieModel.findOne(
            { _id: selectedData.currentMovieId, name: selectedData.movieName },
            {
                commentReports: {
                    $elemMatch: {
                        [userReportProvider === "google"
                            ? "googleUserReportId"
                            : "loginUserReportId"]: userReportId,
                    },
                },
            }
        );

        if (findeMovieCommentReportDocument.commentReports.length === 0) {
            const insertUserRequestReport = await movieModel.updateOne(
                { _id: selectedData.currentMovieId, name: selectedData.movieName },
                {
                    $push: {
                        commentReports: {
                            [userReportProvider === "google"
                                ? "googleUserReportId"
                                : "loginUserReportId"]: userReportId,
                            report: report,
                            reportCommentId: selectedData.commentId,
                        },
                    },
                }
            );

            if (!!insertUserRequestReport.modifiedCount) {
                return res.status(200).json({
                    message: "your report is submited!!",
                });
            }
        } else {
            return res.status(200).json({
                message: "you can report after 24hours..",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const getLoginUser = async function (req, res, next) {
    try {
        const { id } = req.params;
        const varifyUser = await jwt.verify(id, JWT_TOKEN);
        const { _id, provider } = varifyUser;

        if (provider === "login") {
            const findUser = await userModel.findOne({ _id }, { password: 0, tokens: 0 });
            return res.status(200).json({
                user: findUser,
            });
        }

        if (provider === "google") {
            const findUser = await googleAuthUser.findOne({ _id }, { password: 0, tokens: 0 });

            return res.status(200).json({
                user: findUser,
            });
        }
    } catch (err) {
        console.log(err);
    }
};

/**
 *
 * @param { googleAuthUser, userModel } colelctions db user login colelction
 * @param {*} res
 * @param { Object } data
 * @param {*} id
 * @returns { Object } response profile update or not message
 */
const updateUserProfileFunction = async function (colelctions, res, data, id) {
    const updateUserProfile = await colelctions.updateOne(
        { _id: id },
        {
            $set: data,
        }
    );

    if (!!updateUserProfile.modifiedCount) {
        return res.status(200).json({
            message: "profile update",
        });
    } else {
        return res.status(200).json({
            message: "already updated",
        });
    }
};

const updateUserProfileInformation = async function (collection, res, data) {
    const id = data._id;
    const updateUserProfileObject = {
        name: data.name,
        email: data.email,
        bio: data.bio,
    };

    if (data?.profileImageName) {
        /**
         * @updateUserProfileObject object if the user update the profile then add the profile image file into the object else update only name bio and the user name fildes..
         */
        updateUserProfileObject.imageUrl = data.profileImageName;
        updateUserProfileObject.uploadCustomProfileImage = true;
        await updateUserProfileFunction(collection, res, updateUserProfileObject, id);
    } else {
        await updateUserProfileFunction(collection, res, updateUserProfileObject, id);
    }
};

const updateUserProfile = async function (req, res, next) {
    try {
        const { name, email, bio, token } = req.body;
        const file = req.files;

        const varifyUser = await jwt.verify(token, JWT_TOKEN);
        const { _id, provider } = varifyUser;

        const data = {
            _id,
            name,
            email,
            bio,
        };

        if (!!file.length) {
            /**
             * @profileImageName get the user update image name
             * @userProfileImagePath get the user update image pathname
             */

            const profileImageName = file[0].filename;
            const userProfileImagePath = file[0].path;

            /**
             * @profileImageName if the user update the profile photo then add the new property into the object.
             */
            data.profileImageName = profileImageName;

            // store the user branner image and the user profile image into the server folder files.
            await compressImage(
                userProfileImagePath,
                "compressUserProfileImages",
                profileImageName
            );

            if (provider == "login") {
                await updateUserProfileInformation(userModel, res, data);
            }
            if (provider === "google") {
                await updateUserProfileInformation(googleAuthUser, res, data);
            }
        } else {
            if (provider == "login") {
                await updateUserProfileInformation(userModel, res, data);
            }
            if (provider === "google") {
                await updateUserProfileInformation(googleAuthUser, res, data);
            }
        }
    } catch (err) {
        console.log(err);
    }
};

/**
 *
 * @param { googleAuthSchema, userModel } collection  database user collection to find the which user is login..
 * @param { Object } res
 * @param { Object } data
 * @returns
 */
const updateUserBannerProfile = async function (collection, res, data) {
    /**
     * @updateUserProfileBanner find the user and then update the user data.
     */
    const updateUserProfileBanner = await collection.updateOne(
        { _id: data._id },
        { $set: { userProfileBannerImage: data.fileName } }
    );

    if (!!updateUserProfileBanner.modifiedCount) {
        return res.status(200).json({
            message: "update profile",
        });
    } else {
        return res.status(200).json({
            message: "already updated",
        });
    }
};

const updateUserProfileBanner = async function (req, res, next) {
    try {
        const { token } = req.body;
        const file = req.files;
        const varifyUser = await jwt.verify(token, JWT_TOKEN);
        const { _id, provider } = varifyUser;
        const fileName = file[0].filename;

        const data = {
            _id,
            fileName,
        };

        if (provider === "google") {
            await updateUserBannerProfile(googleAuthUser, res, data);
        }

        if (provider === "login") {
            await updateUserBannerProfile(userModel, res, data);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAllMovies,
    streamVideo,
    getOneMovi,
    storeHistoryVideo,
    userHistory,
    removeMovieFromHistory,
    likeMovies,
    getAllLikeMovies,
    videoViewsFunction,
    getSearchMovie,
    getAllSearchMovies,
    deleteLikeVideoFromDB,
    deleteUserAllHistory,
    removeAllSelectedMovies,
    inertNewMovieComment,
    getMoivesComments,
    userLikeMovieComments,
    movieCommentReport,
    getLoginUser,
    updateUserProfile,
    updateUserProfileBanner,
};
