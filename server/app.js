const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const dataBaseConnectionFuntion = require("./model/db/db");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const ejs = require("ejs");
const cart = require("./cart");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const numCPUs = require("node:os").cpus().length;
const process = require("node:process");
const cluster = require("node:cluster");

const app = express();
const port = cart.PORT || 7000;

// routes files
const adminRouter = require("./routes/adminRoute");
const authRouter = require("./routes/authRoute");
const indexRouter = require("./routes/indexRoute");
const { cpus } = require("os");

// middleware
app.use(cors());
app.use(flash());
app.use(express.json());
app.use(cookieParser());
app.use(
    bodyParser.json({
        limit: "50mb",
        parameterLimit: 100000,
    })
);
app.engine("ejs", ejs.renderFile);
app.set("view engine", "ejs");
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);
app.use(express.static(path.join(path.resolve(__dirname), "public")));
app.use(express.static(path.join(path.resolve(__dirname), "build")));
app.use(express.static(path.join(path.resolve(__dirname), "uploads")));
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
app.use("/index", indexRouter);

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    dataBaseConnectionFuntion(() => {
        // server listening
        app.listen(port, () => {
            console.log(`server runing in port ${port}`);
        });
    });

    console.log(`Worker ${process.pid} started`);
}
