const Book = require('../models/books');
const DataAccess = require('../data-access/data-access-facade');

exports.getAllBooks = async function (req, res) {
    try {
        if (req.query['isbn']) {
            const book = await DataAccess.getBookbyId(req.query['isbn'])
            res.status(200).json(book);
        }
        else {
            const allbooks = await DataAccess.readAllBooks();
            if (allbooks) {
                res.status(200).json(allbooks);
            } else {
                res.status(401).json({ "error": "Book does not exist" });
            }
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }

};


exports.getBookById = async function (req, res) {
    try {
        const book = await DataAccess.getBookbyId(req.query['isbn']);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(401).json({ "error": "Book does not exist" });
        }
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
};

exports.addNewBook = async function (req, res) {

    const reqbody = req.body;
    const newBook = new Book(reqbody.isbn, reqbody.title, reqbody.max_checkout_length, reqbody.authors);
    try {
        const addedBook = await DataAccess.addNewBook(newBook);
        if (addedBook) {
            res.status(201).json(addedBook);
        }
        else {
            res.status(409).json({ "error": "Book could not be added" });
        }
    }
    catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }

};

exports.addCopy = async function (req, res) {
    try{
        const getBook=await DataAccess.getBookbyId(req.body.isbn);
        if(getBook)
            {
                await DataAccess.updateBookCopy(req.body.isbn, parseInt(req.body.noCopies));
                res.status(201).json({Book:getBook, noCopies:req.body.noCopies});
            }
            else {
                res.status(409).json({ "error": "Book Copies could not be added" });
            }
    }

    catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }
    
};



