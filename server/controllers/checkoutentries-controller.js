const CheckOutEntry = require('../models/checkoutentry');
const DataAccess = require('../data-access/data-access-facade');
const responseBody = require('../models/ResponseBody')

exports.addBookEntries = async function (req, res) {
    try {
        const reqbody=req.body;
        const newEntry=new CheckOutEntry(reqbody.isbn, reqbody.memberid, reqbody.issued_bookno, reqbody.checkoutdate, reqbody.duedate);
        const addednewEntry=await DataAccess.addNewEntries(newEntry);
        if (addednewEntry) {
            res.status(201).json(new responseBody(addednewEntry, "Book retrieved successfully", true));
        }
        else {
            res.status(409).json(new responseBody(null, "Entry could not be added", false));
        }
        
    } catch (error) {
        res.status(500).json(new responseBody(null, "Internal Server Error", false));
    }

};