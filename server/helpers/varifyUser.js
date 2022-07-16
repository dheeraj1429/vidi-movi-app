const cart = require("../cart");
const JWT_TOKEN = cart.TOKEN;
const jwt = require("jsonwebtoken");

const userFindInCookie = async function (req, res, userToken) {
    /**
     * @token login user session token
     * @userVarify varify the login user
     * @return the the valid user from the function
     */

    const token = req.cookies?.user?.data?.token;

    if (!token) {
        return res.status(200).json({
            success: false,
            message: "there is no user found in session",
        });
    }
    const userVarify = await jwt.verify(userToken ? userToken : token, JWT_TOKEN);

    return userVarify;
};

module.exports = userFindInCookie;
