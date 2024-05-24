
const DataAccess = require('../data-access/data-access-facade');

exports.getAllBooksCopy = async function (req, res) {
    try {
        if (req.query['isbn']) {
            const bookcopy = await DataAccess.giveBookCopyByISBN(req.query['isbn'])
            res.status(200).json(bookcopy);
        }
        else {
            const allbookscopies = await DataAccess.readAllBooksCopy();
            if (allbookscopies) {
                res.status(200).json(allbookscopies);
            } else {
                res.status(401).json({ "error": "Book copies does not exist" });
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
        if (getbooks) {
            res.status(200).json(getbooks);
        } else {
            res.status(401).json({ "error": "Book copies does not exist" });
        }
    }
    catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }

};




