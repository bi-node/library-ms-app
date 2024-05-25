const loginResponse = require('../models/LoginResponse');
const responseBody = require('../models/ResponseBody');
const user = require('../models/user'); // Ensure you import the user model

module.exports = (req, resp, next) => {
    try {
        const accessToken = req.headers['access-token'];
        const token = loginResponse.findToken(accessToken);

        if (!accessToken || !token) {
            return resp.status(401).json(new responseBody(null, "Unauthenticated request. Please login to continue."));
        }

        const loginUser = user.findByUsername(token.username);
        if (!loginUser) {
            return resp.status(401).json(new responseBody(null, "Invalid token. Please login again."));
        }

        req.loginUser = loginUser; // Set the authenticated user on the request object
        next();
    } catch (error) {
        resp.status(500).json({ "error": "Internal server error" });
    }
};
