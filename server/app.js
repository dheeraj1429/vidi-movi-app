const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const dataBaseConnectionFuntion = require("./model/db/db");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const ejs = require("ejs");
const cart = require("./cart");

const app = express();
const port = cart.PORT || 7000;

// routes files
const adminRouter = require("./routes/adminRoute");
const authRouter = require("./routes/authRoute");

// middleware
app.use(cors());
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
app.use(helmet());
app.use(express.static(path.join(path.resolve(__dirname), "public")));
app.use(express.static(path.join(path.resolve(__dirname), "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan());
app.use(
    cookieSession({
        name: "cookie-session",
        keys: [cart.KEY_1, cart.KEY_2],
    })
);

// routes
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

dataBaseConnectionFuntion(() => {
    // server listening
    app.listen(port, () => {
        console.log(`server runing in port ${port}`);
    });
});
