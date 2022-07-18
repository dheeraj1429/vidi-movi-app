const userModel = require("../model/Schema/userSchema");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const cart = require("../cart");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const googleAuthUser = require("../model/Schema/googleAuthSchema");

const JWT_TOKEN = cart.TOKEN;

const signInUser = async function (req, res, next) {
    try {
        const { name, email, password, confirmPassword } = req.body;

        const findUserInDb = await userModel.findOne({ email: email });

        if (findUserInDb) {
            return res.status(400).json({ success: false, messages: "user email is already use" });
        }

        if (password === confirmPassword) {
            const user = new userModel({
                name,
                email,
                password,
                provider: "login",
            });

            const userRef = await user.save();

            // Genrate the user token
            const token = await user.genrateUserToken();

            if (!token) return res.status(400).json({ success: false, massage: "user token is not created" });
            if (!userRef) return res.status(400).json({ success: false, massage: "somthing worng" });

            const dataObject = {
                name,
                email,
                admin: user.isAdmin,
                _id: user._id,
                imageUrl: user.imageUrl,
                uploadCustomProfileImage: user.uploadCustomProfileImage,
                token,
                provider: "login",
            };

            res.cookie("user", {
                data: dataObject,
            });

            return res.status(200).json({
                success: true,
                data: dataObject,
            });
        }
    } catch (err) {
        console.log(err);
        const field = Object.keys(err.keyValue);
        const code = 409;
        const error = `An account with that ${field} already exists.`;
        res.status(code).send({ messages: error, fields: field });
    }
};

const logInUser = async function (req, res, next) {
    try {
        const { email, password } = req.body;

        const findDbUser = await userModel.findOne({ email: email });

        if (!findDbUser) return res.status(200).json({ success: false, messages: "user is not exists" });

        const varifyUser = await bcryptjs.compare(password, findDbUser.password);

        // Genrate the user token
        const token = await findDbUser.genrateUserToken();

        if (varifyUser) {
            const dataObject = {
                name: findDbUser.name,
                email: findDbUser.email,
                admin: findDbUser.isAdmin,
                _id: findDbUser._id,
                imageUrl: findDbUser.imageUrl,
                uploadCustomProfileImage: findDbUser.uploadCustomProfileImage,
                token: token,
                provider: "login",
            };

            res.cookie("user", {
                data: dataObject,
            });

            return res.status(200).json({
                success: true,
                data: dataObject,
            });
        } else {
            return res.status(200).json({ success: false, messages: "password is not match" });
        }
    } catch (err) {
        console.log(err);
    }
};

const forgetPassword = async function (req, res, next) {
    try {
        const { email } = req.body;
        const findUserInDb = await userModel.findOne({ email: email });
        if (!findUserInDb) return res.status(200).json({ success: false, messages: "no user find" });

        console.log(email);

        let userID = findUserInDb._id;
        let userName = findUserInDb.name;
        let userEmail = findUserInDb.email;
        let KEY = cart.TOKEN;

        const token = await jwt.sign({ _id: userID, name: userName, email: userEmail }, KEY);

        if (token) {
            fs.readFile(path.join(path.dirname(__dirname), "views", "templates", "forget-password.ejs"), "utf-8", function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    const outputData = data.replace(
                        '<button class="large expend" href="#">RESET PASSWORD</button>',
                        `<a href='${cart.WEBSITE_URL}/auth/password-reset-request/${token}'>
                        <button class="large expend" >RESET PASSWORD</button>
                        </a>`
                    );

                    let transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: cart.user,
                            pass: cart.password,
                        },
                    });

                    const mailOptions = {
                        from: cart.user,
                        to: findUserInDb.email,
                        subject: "forget password request",
                        text: "reset your password",
                        html: ejs.render(outputData),
                    };

                    transporter.sendMail(mailOptions, function (err, data) {
                        if (err) {
                            console.log(err);

                            return res.status(400).json({ success: false, messages: "some thing worng!!" });
                        }

                        console.log(data);
                        console.log("mail successfully sent");

                        return res.status(200).json({
                            success: true,
                            messages: "mail successfully sent",
                        });
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const resetPasswordRequest = async function (req, res, next) {
    try {
        const { password, id } = req.body;

        if (!password) return res.status(200).json({ messages: "password not found" });

        const varifyTokne = await jwt.verify(id, JWT_TOKEN);
        const hashpassword = await bcryptjs.hash(password, 11);

        const userFindDb = await userModel.updateOne(
            { _id: varifyTokne._id, name: varifyTokne.name, email: varifyTokne.email },
            { $set: { password: hashpassword } }
        );

        if (userFindDb.acknowledged) {
            return res.status(200).json({
                success: true,
                messages: "password change successfully",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const googleLogin = async function (req, res, next) {
    try {
        const { userObject } = req.body;

        if (!userObject)
            return res.status(200).json({
                message: "somthing worng",
            });

        const findUserInDb = await googleAuthUser.findOne({
            googleId: userObject.googleId,
            email: userObject.email,
            name: userObject.name,
        });

        if (findUserInDb) {
            const findUserToken = await findUserInDb.genrateUserToken();

            const userConfig = {
                _id: findUserInDb._id,
                googleId: findUserInDb.googleId,
                imageUrl: findUserInDb.imageUrl,
                uploadCustomProfileImage: findUserInDb.uploadCustomProfileImage,
                email: findUserInDb.email,
                name: findUserInDb.givenName,
                token: findUserToken,
                admin: findUserInDb.isAdmin,
                provider: "google",
            };

            res.cookie("user", {
                data: userConfig,
            });

            return res.status(200).json({
                success: true,
                data: userConfig,
            });
        } else {
            const newGoogleUser = await googleAuthUser({
                googleId: userObject.googleId,
                email: userObject.email,
                imageUrl: userObject.imageUrl,
                name: userObject.name,
                givenName: userObject.givenName,
                familyName: userObject.familyName,
                provider: "google",
            });

            const googleUserRef = await newGoogleUser.save();
            const userToken = await googleUserRef.genrateUserToken();

            if (googleUserRef) {
                const userConfig = {
                    _id: googleUserRef._id,
                    googleId: googleUserRef.googleId,
                    imageUrl: googleUserRef.imageUrl,
                    email: googleUserRef.email,
                    name: googleUserRef.givenName,
                    token: userToken,
                    admin: googleUserRef.isAdmin,
                    provider: "google",
                };

                res.cookie("user", {
                    data: userConfig,
                });

                return res.status(200).json({
                    success: true,
                    data: userConfig,
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    signInUser,
    logInUser,
    forgetPassword,
    resetPasswordRequest,
    googleLogin,
};
