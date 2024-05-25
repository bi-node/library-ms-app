
const DataAccess = require('../data-access/data-access-facade');
const responseBody = require('../models/ResponseBody');

exports.getAllBooksCopy = async function (req, res) {
    try {
        if (req.query['isbn']) {
            const bookcopy = await DataAccess.giveBookCopyByISBN(req.query['isbn'])
            res.status(200).json(new responseBody(bookcopy, "Book retrieved successfully", true));
        }
        else {
            const allbookscopies = await DataAccess.readAllBooksCopy();
            if (allbookscopies) {
                res.status(200).json(new responseBody(allbookscopies, "Book retrieved successfully", true));
            } else {
                res.status(401).json(new responseBody(null, "Book copies doesnot exist", false));
            }
        }
    }
    catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }

};

exports.getBookCopiesById = async function (req, res) {
    try {
        const isbn = req.params.id;
        const bookcopy = await DataAccess.giveBookCopyByISBN(isbn)
        res.status(200).json(bookcopy);
        if (bookcopy) {
            res.status(200).json(allbookscopies);
        } else {
            res.status(401).json({ "error": "Book copies does not exist" });
        }
    }
    catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};

exports.getAvailableBookByISBN = async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const getbooks = await DataAccess.getAvailableBookCopies(isbn);
        //get only one book among others
        const getbook=getbooks[0];
        if (getbook) {
            res.status(200).json(getbook);
        } else {
            res.status(401).json({ "error": "Book copies does not exist" });
        }
    }
    catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }

};

exports.setBook = async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const updatedBook = await DataAccess.setBooktoNA(isbn);
        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(401).json({ "error": "Book copy does not exist" });
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};




