require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const dataBaseConnectionFuntion = require("./model/db/db");
const cookieSession = require("cookie-session");
const passport = require("passport");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 7000;

// files
const rootFolder = require("./helpers/rootFolder");

// routes files
const indexRouter = require("./routes/index.Route");
const authRouter = require("./routes/authRoute");

// middleware
app.use(cors());
app.set("view engine", "hbs");
app.use(helmet());
app.use(express.static(path.join(rootFolder, "public")));
app.use(express.static(path.join(rootFolder, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan());
app.use(
    cookieSession({
        name: "cookie-session",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.KEY_1, process.env.KEY_2],
    })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

dataBaseConnectionFuntion(() => {
    // server listening
    app.listen(port, () => {
        console.log(`server runing in port ${port}`);
    });
});
