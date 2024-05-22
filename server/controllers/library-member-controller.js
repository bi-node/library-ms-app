const LibraryMember = require('../models/librarymember');

const DataAccess = require('../data-access/data-access-facade');

exports.getAllMembers = async function (req, res) {
    
    try {
        const allmembers = await DataAccess.readAllMember();
        
        if (allmembers) {
        
                res.status(200).json(allmembers);
           
        } else {
            res.status(401).json({ "error": "User does not exist" });
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};