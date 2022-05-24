const mongoose = require("mongoose");
const cart = require("../../cart");

const dataBaseConnectionFuntion = function (callBack) {
    mongoose
        .connect(cart.URL)
        .then((result) => {
            console.log("database connected");
            callBack();
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = dataBaseConnectionFuntion;
