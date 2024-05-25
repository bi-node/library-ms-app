
const DataAccess = require('../data-access/data-access-facade');
const responseBody = require('../models/ResponseBody')

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
        res.status(500).json(new responseBody(null, "Internal server error", false));
    }

};

exports.getBookCopiesById = async function (req, res) {
    try {
        const isbn = req.params.id;
        const bookcopy = await DataAccess.giveBookCopyByISBN(isbn)
       
        if (bookcopy) {
            res.status(200).json(new responseBody(bookcopy, "Book copy retrieved successfully", true));
        } else {
            res.status(401).json(new responseBody(null, "Book copy not found", false));
        }
    }
    catch (error) {
        res.status(500).json(new responseBody(null, "Internal server error", false));
    }
};

exports.getAvailableBookByISBN = async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const getbooks = await DataAccess.getAvailableBookCopies(isbn);
        //get only one book among others
        const getbook=getbooks[0];
        if (getbook) {
            res.status(200).json(new responseBody(getbook, "Book copy retrieved successfully", true));
        } else {
            res.status(401).json(new responseBody(null, "Book copy doesn't exist", false));
        }
    }
    catch (error) {
        res.status(500).json(new responseBody(null, "Internal server error", false));
    }

};

exports.setBook = async function (req, res) {
    try {
        const isbn = req.params.isbn;
        const updatedBook = await DataAccess.setBooktoNA(isbn);
        if (updatedBook) {
            res.status(200).json(new responseBody(updatedBook, "Book copy retrieved successfully", true));
        } else {
            res.status(401).json(new responseBody(null, "Book copy doesn't exist", false));
        }
    } catch (error) {
        res.status(500).json(new responseBody(null, "Internal server error", false));
    }
};




