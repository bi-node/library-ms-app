const DataAccess = require('../data-access/data-access-facade');
const responseBody = require('../models/ResponseBody');
const loginResponse = require('../models/LoginResponse');
const user=require('../models/user')

exports.getAllUsers = async function (req, res) {
    try {
        const accessToken = req.headers['access-token'];
        const token = loginResponse.findToken(accessToken);
        let loginUser = user.findByUsername(token.username); // Ensure `user` is imported

        if (loginUser) {

            const getAllUsers = await DataAccess.readAllUser();
            if (getAllUsers) {
                res.status(200).json(new responseBody(getAllUsers, "All Users retrieved successfully", true));
               
            } else {
                res.status(404).json(new responseBody(null, "Users not found", false));
                
            }
        }
    }
    catch (error) {
        res.status(500).json(new responseBody(null, "Internal server error", false));
    }

};
