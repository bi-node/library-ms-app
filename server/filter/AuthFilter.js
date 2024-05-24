const loginResponse = require('../models/LoginResponse');
const responseBody = require('../models/ResponseBody');

module.exports = (req, resp, next) => {
    const accessToken = req.headers['access-token'];
    const token = loginResponse.findToken(accessToken);
    if (!accessToken || !token) {
        resp.status(401).json(new responseBody(null, "Unauthenticated request. Please login to continue;"));
    } else {
        next();
    }
};
