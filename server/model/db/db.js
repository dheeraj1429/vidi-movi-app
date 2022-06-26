const mongoose = require("mongoose");

const dataBaseConnectionFuntion = function (callBack) {
    mongoose
        .connect(process.env.URL)
        .then((result) => {
            console.log("database connected");
            callBack();
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = dataBaseConnectionFuntion;
