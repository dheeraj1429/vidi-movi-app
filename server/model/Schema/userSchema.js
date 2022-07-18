const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const cart = require("../../cart");
const JWT_TOKEN = cart.TOKEN;

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "please enter the user name"] },
    email: { type: String, required: [true, "please enter the user email address"], unique: true },
    password: { type: String, required: [true, "please enter the user password"] },
    isAdmin: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
    tokens: [{ token: { type: String, required: [true, "please genrate the user token"] } }],
    provider: { type: String },
    favoriteMovies: [{ moviesId: { type: mongoose.Types.ObjectId, ref: "movie" }, likeTime: { type: Date, default: Date.now } }],
    history: [
        {
            moviesId: { type: mongoose.Types.ObjectId, ref: "movie" },
            watchTime: { type: Date, default: Date.now },
            videoCurrentTime: { type: Number, default: 0 },
        },
    ],
    watchLater: [{ moviesId: { type: mongoose.Types.ObjectId, ref: "movie" } }],
    moviesPlayList: [{ moviesId: { type: String, ref: "movie" }, storeDate: { type: Date, default: Date.now } }],
    likeComments: [
        {
            movieComment: { type: mongoose.Types.ObjectId, ref: "movie" },
            googleUserCommnetId: { type: mongoose.Types.ObjectId, ref: "authUser" },
            loginUserCommnetId: { type: mongoose.Types.ObjectId, ref: "user" },
            likeTime: { type: Date, default: Date.now },
        },
    ],
    imageUrl: {
        type: String,
        default:
            "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31",
    },
    uploadCustomProfileImage: { type: Boolean, default: false },
    bio: { type: String },
});

// genrate the user token
userSchema.methods.genrateUserToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString(), name: this.name, isAdmin: this.isAdmin, provider: this.provider }, JWT_TOKEN, {
            expiresIn: "30d",
        });
        this.tokens = this.tokens.concat({ token });
        this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

// hash the user password
userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const hashpassword = await bcryptjs.hash(this.password, 11);
            this.password = hashpassword;
        }
        next();
    } catch (err) {
        console.log(err);
    }
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
