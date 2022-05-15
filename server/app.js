require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const dataBaseConnectionFuntion = require("./model/db/db");

const app = express();
const port = process.env.PORT || 7000;

// files
const rootFolder = require("./helpers/rootFolder");

const indexRouter = require("./routes/index.Route");
const authRouter = require("./routes/authRoute");

// middleware
app.use(cors());
app.set("view engine", "hbs");
app.use(express.static(path.join(rootFolder, "public")));
app.use(express.static(path.join(rootFolder, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan());

// routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

dataBaseConnectionFuntion(() => {
    // server listening
    app.listen(port, () => {
        console.log(`server runing in port ${port}`);
    });
});
