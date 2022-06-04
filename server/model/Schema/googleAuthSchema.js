const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cart = require("../../cart");
const JWT_TOKEN = cart.TOKEN;

const Schema = mongoose.Schema;

const authUserSchema = new Schema({
    googleId: { type: String, required: [true, "google is must be requied"] },
    imageUrl: { type: String, required: [true, "google image is required"] },
    email: { type: String, required: [true, "google email is required"] },
    name: { type: String, required: [true, "google name is required"] },
    givenName: { type: String, required: [true, "google givenName name is required"] },
    familyName: { type: String, required: [true, "google familyName name is required"] },
    isAdmin: { type: String, default: "user" },
    tokens: [{ token: { type: String, required: [true, "please genrate the user token"] } }],
    provider: { type: String },
    createdAt: { type: Date, default: Date.now },
    favoriteMovies: [{ movieId: { type: mongoose.Types.ObjectId, ref: "movie" }, likeTime: { type: Date, default: Date.now } }],
    history: [{ moviesId: { type: mongoose.Types.ObjectId, ref: "movie" }, watchTime: { type: Date, default: Date.now } }],
});

authUserSchema.methods.genrateUserToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString(), name: this.name, email: this.email, provider: this.provider }, JWT_TOKEN, {
            expiresIn: "30d",
        });
        this.tokens = this.tokens.concat({ token });
        this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

const googleAuthUser = new mongoose.model("authUser", authUserSchema);

module.exports = googleAuthUser;
