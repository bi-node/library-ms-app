const Book = require('../models/books');
const DataAccess = require('../data-access/data-access-facade');
const responseBody = require('../models/ResponseBody');

exports.getAllBooks = async function (req, res) {
    try {
       //req.loginUser; // Access the authenticated user from the request object
        if (req.query['isbn']) {
            const book = await DataAccess.getBookbyId(req.query['isbn']);
            res.status(200).json(new responseBody(book, "Book retrieved successfully", true));
        } else {
            const allBooks = await DataAccess.readAllBooks();
            if (allBooks) {
                res.status(200).json(new responseBody(allBooks, "Books retrieved successfully", true));
            } else {
                res.status(404).json(new responseBody(null, "No books found", false));
            }
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};

exports.getBookById = async function (req, res) {
    try {
        const loginUser = req.loginUser; // Access the authenticated user from the request object
        const book = await DataAccess.getBookbyId(req.query['isbn']);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ "error": "Book does not exist" });
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};

exports.addNewBook = async function (req, res) {
    try {
        const loginUser = req.loginUser; // Access the authenticated user from the request object
        const reqbody = req.body;
        const newBook = new Book(reqbody.isbn, reqbody.title, reqbody.max_checkout_length, reqbody.authors);
        const addedBook = await DataAccess.addNewBook(newBook);
        if (addedBook) {
            res.status(201).json(addedBook);
        } else {
            res.status(409).json({ "error": "Book could not be added" });
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};

exports.addCopy = async function (req, res) {
    try {
        const loginUser = req.loginUser; // Access the authenticated user from the request object
        const getBook = await DataAccess.getBookbyId(req.body.isbn);
        if (getBook) {
            await DataAccess.updateBookCopy(req.body.isbn, parseInt(req.body.noCopies));
            res.status(201).json({ Book: getBook, noCopies: req.body.noCopies });
        } else {
            res.status(409).json({ "error": "Book Copies could not be added" });
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};
