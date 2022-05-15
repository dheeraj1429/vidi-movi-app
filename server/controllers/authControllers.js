const userModel = require("../model/Schema/userSchema");

const signInUser = async function (req, res, next) {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password === confirmPassword) {
            const user = new userModel({
                name,
                email,
                password,
            });

            const userRef = await user.save();

            // Genrate the user token
            const token = await user.genrateUserToken();

            if (!token) return res.status(400).json({ success: false, massage: "user token is not created" });
            if (!userRef) return res.status(400).json({ success: false, massage: "somthing worng" });

            const dataObject = {
                name,
                email,
                admin: user.isAdmin,
                token,
            };

            res.cookie("user", {
                data: dataObject,
            });

            return res.status(200).json({
                success: true,
                data: dataObject,
            });
        }
    } catch (err) {
        console.log(err);
        const field = Object.keys(err.keyValue);
        const code = 409;
        const error = `An account with that ${field} already exists.`;
        res.status(code).send({ messages: error, fields: field });
    }
};

module.exports = {
    signInUser,
};
