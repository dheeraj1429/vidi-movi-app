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
    favoriteMovies: [{ movieId: { type: mongoose.Types.ObjectId } }],
});

// genrate the user token
userSchema.methods.genrateUserToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString(), name: this.name, isAdmin: this.isAdmin }, JWT_TOKEN, { expiresIn: "30d" });
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
