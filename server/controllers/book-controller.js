const Book = require('../models/books');
const DataAccess = require('../data-access/data-access-facade');

exports.getAllBooks = async function (req, res) {
    try {
        const allbooks = await DataAccess.readAllBooks();
        if (allbooks) {
            res.status(200).json(allbooks);
        } else {
            res.status(401).json({ "error": "Book does not exist" });
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};

// exports.addNewMember = async function (req, res) {

//     let { firstname, lastname, telephone, address } = req.body;
//     const newMember = new LibraryMember(null, firstname, lastname, telephone, address);
//     try {
//         const addedMember = await DataAccess.addNewMember(newMember);
//         res.status(201).json(addedMember);
//     }
//     catch (error) {
//         res.status(500).json({ "error": "Internal server error" });
//     }

// };