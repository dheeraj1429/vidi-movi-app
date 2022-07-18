require("dotenv").config();
const express = require("express"),
    morgan = require("morgan"),
    path = require("path"),
    cors = require("cors"),
    dataBaseConnectionFuntion = require("./model/db/db"),
    cookieSession = require("cookie-session"),
    helmet = require("helmet"),
    ejs = require("ejs"),
    cart = require("./cart"),
    flash = require("connect-flash"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    cluster = require("node:cluster"),
    numCPUs = require("node:os").cpus().length,
    process = require("node:process"),
    app = express(),
    port = process.env.PORT || 9005,
    http = require("http").createServer(app),
    socket = require("socket.io"),
    movieModel = require("./model/Schema/MoviesSchema"),
    jwt = require("jsonwebtoken"),
    JWT_TOKEN = cart.TOKEN,
    io = socket(http, {
        cors: {
            origin: "http://localhost/3000",
            credentials: true,
        },
    });

/* -- route files---*/
const adminRouter = require("./routes/adminRoute"),
    authRouter = require("./routes/authRoute"),
    indexRouter = require("./routes/indexRoute");

/* -- middleware ---*/
app.use(cors());
app.use(flash());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
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

// app.use(
//     helmet({
//         contentSecurityPolicy: {
//             useDefaults: true,
//             directives: {
//                 "script-src": ["'self'", "https://apis.google.com/js/api.js", "apis.google.com", "accounts.google.com"],
//                 "frame-src": ["'self'", "https://apis.google.com/js/api.js", "apis.google.com", "accounts.google.com"],
//             },
//         },
//     })
// );

// app.use(express.static(path.join(path.resolve(__dirname), "public")));
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

app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(__dirname), "build", "index.html"));
});

// server
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
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    dataBaseConnectionFuntion(() => {
        // server listening
        http.listen(port, () => {
            console.log(`server runing in port ${port}`);
        });
    });

    console.log(`Worker ${process.pid} started`);
}
