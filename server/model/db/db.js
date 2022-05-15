const mongoose = require("mongoose");

const url = process.env.URL;

const dataBaseConnectionFuntion = function (callBack) {
    mongoose
        .connect(url)
        .then((result) => {
            console.log("database connected");
            callBack();
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = dataBaseConnectionFuntion;
