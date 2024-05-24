const DataAccess = require('../data-access/data-access-facade');
const responseBody = require('../models/ResponseBody');
const loginResponse = require('../models/LoginResponse');

exports.login = async function (req, res) {
    const username = req.body.username;
    try {
        const allUsers = await DataAccess.readAllUser();
        const isUser=allUsers.find(user=>user.username==username)
        if (isUser) {
            const password = req.body.password;
            if (password === isUser.password) {
                const accessToken=crypto.randomUUID() + "-" + Date.now() + "-" + isUser.username;
                const resp = new loginResponse(isUser.username, accessToken);
                 resp.addToken();
                res.status(200).json(new responseBody(resp, "Login Successful"));
            } else {
                res.status(401).json(new responseBody(null, "Invalid Credentials"));
            }
        } else {
            res.status(401).json(new responseBody(null, "User does not exist"));
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};

