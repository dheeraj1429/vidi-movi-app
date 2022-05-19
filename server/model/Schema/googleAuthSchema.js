const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authUserSchema = new Schema({
    googleId: { type: String, required: true },
    displayName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const authUser = mongoose.model("authUser", authUserSchema);

module.exports = authUser;
