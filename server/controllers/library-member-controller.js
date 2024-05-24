const LibraryMember = require('../models/librarymember');
const user=require('../models/user')
const responseBody = require('../models/ResponseBody');
const loginResponse = require('../models/LoginResponse');
const DataAccess = require('../data-access/data-access-facade');

exports.getAllMembers = async function (req, res) {
    try {
        const accessToken = req.headers['access-token'];
        const token = loginResponse.findToken(accessToken);
        let loginUser = user.findByUsername(token.username); // Ensure `user` is imported

        if(loginUser){

        if (req.query['memberid']) {
            const member = await DataAccess.getmemberbyId(req.query['memberid']);
            res.status(200).json(new responseBody(member, "Member retrieved successfully", true));
        } else {
            const allmembers = await DataAccess.readAllMember();
            if (allmembers) {
                res.status(200).json(new responseBody(allmembers, "All members retrieved successfully", true));
            } else {
                res.status(404).json(new responseBody(null, "No members found", false));
            }
        }}
    } catch (error) {
        console.error(error);
        res.status(500).json(new responseBody(null, "Internal server error", false));
    }
};

exports.addNewMember = async function (req, res) {

    let { firstname, lastname, telephone, address } = req.body;
    const newMember = new LibraryMember(null, firstname, lastname, telephone, address);
    try {
        const addedMember = await DataAccess.addNewMember(newMember);
        res.status(201).json(addedMember);
    }
    catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};



