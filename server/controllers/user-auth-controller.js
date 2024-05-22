const User = require('../models/user');
const DataAccess = require('../data-access/data-access-facade')

exports.getAuthentication = async function (req, res) {
    const username = req.body.username;
    try {
        const foundUser = await User.findUsername(username);
        if (foundUser) {
            const password = req.body.password;
            if (password === foundUser.password) {
                res.status(200).json({ "username": username, "password": password });
            } else {
                res.status(401).json({ "error": "Password does not match" });
            }
        } else {
            res.status(401).json({ "error": "User does not exist" });
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};

