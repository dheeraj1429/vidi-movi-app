const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");

const config = {
    GoogleClientID: process.env.GOOGLE_CLIENT_ID,
    GoogleCLientSecret: process.envGOOGLE_CLIENT_SECRET,
};

passport.use(
    new Strategy(
        {
            clientID: config.GoogleClientID,
            clientSecret: config.GoogleCLientSecret,
            callbackURL: "/auth/google/callback",
            passReqToCallback: true,
        },
        function (req, accessTokne, refreshToken, profile, done) {
            console.log(profile);

            return done(null, profile);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

router.post("/signIn", authControllers.signInUser);
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureMessage: "somthing worng",
        successMessage: "user successful login with google",
        session: true,
    })
);

module.exports = router;
