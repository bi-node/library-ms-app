const DataAccess = require('../data-access/data-access-facade');

exports.getAllUsers = async function (req, res) {
    try {
        const getAllUsers = await DataAccess.readAllUser();
        if (getAllUsers) {
            res.status(200).json(getAllUsers);
        } else {
            res.status(401).json({ "error": "Book does not exist" });
        }
    }
    catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }

};
