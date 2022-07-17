const movieModel = require("../model/Schema/MoviesSchema");
const userModel = require("../model/Schema/userSchema");
const googleAuthUser = require("../model/Schema/googleAuthSchema");
const path = require("path");
const sharp = require("sharp");

const moviesUpload = async function (req, res, next) {
    try {
        const { name, category, genra, artist, Album, description, licensed } = req.body;
        const file = req.files;

        const videoFileName = file[0].filename;
        const videoPath = file[0].path;
        const thumbnailFileName = file[1].filename;
        const thumbnailpath = file[1].path;

        await sharp(thumbnailpath)
            .resize(200, 200)
            .jpeg({ quality: 90 })
            .toFile(path.join(__dirname, "..", "uploads", "compressImages", thumbnailFileName));

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

const getAllUser = async function (req, res, next) {
    try {
        const authUserRef = await googleAuthUser.find({}, { password: 0, tokens: 0, history: 0, watchLater: 0, favoriteMovies: 0 });
        const logInUsers = await userModel.find({}, { password: 0, tokens: 0, history: 0, watchLater: 0, favoriteMovies: 0 });
        const allUserArray = [];

        authUserRef.map((el) => allUserArray.push(el));
        logInUsers.map((el) => allUserArray.push(el));

        return res.status(200).json({
            success: true,
            userLoginData: allUserArray,
        });
    } catch (err) {
        console.log(err);
    }
};

const updateUserInfoFunction = async function (collection, req, res, next, _id, name, email, AdminDataInfo) {
    const updateUserRef = await collection.updateOne({ _id, name, email }, { $set: { name: name, email: email, isAdmin: AdminDataInfo } });

    if (updateUserRef.modifiedCount === 1) {
        getAllUser(req, res, next);
    }
};

const updateUserProfile = async function (req, res, next) {
    try {
        const { name, email, AdminDataInfo, provider, _id } = req.body;

        if (provider === "google") {
            await updateUserInfoFunction(googleAuthUser, req, res, next, _id, name, email, AdminDataInfo);
        }

        if (provider === "login") {
            await updateUserInfoFunction(userModel, req, res, next, _id, name, email, AdminDataInfo);
        }
    } catch (err) {
        console.log(err);
    }
};

const userDeleteFunction = async function (req, res, next, collection, id) {
    const deleteAccountRef = await collection.deleteOne({ _id: id });
    if (deleteAccountRef.deletedCount) {
        getAllUser(req, res, next);
    }
};

const deleteAccount = async function (req, res, next) {
    try {
        console.log("delete account");
        const { id, provider } = req.body;
        if (provider === "google") {
            userDeleteFunction(req, res, next, googleAuthUser, id);
        }

        if (provider === "login") {
            userDeleteFunction(req, res, next, userModel, id);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    moviesUpload,
    getAllUser,
    updateUserProfile,
    deleteAccount,
};
