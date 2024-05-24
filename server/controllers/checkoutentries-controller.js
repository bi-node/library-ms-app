const CheckOutEntry = require('../models/checkoutentry');
const DataAccess = require('../data-access/data-access-facade');

exports.addBookEntries = async function (req, res) {
    try {
        const reqbody=req.body;
        const newEntry=new CheckOutEntry(reqbody.isbn, reqbody.memberid, reqbody.issued_bookno, reqbody.checkoutdate, reqbody.duedate);
        const addednewEntry=await DataAccess.addNewEntries(newEntry);
        if (addednewEntry) {
            res.status(201).json(addednewEntry);
        }
        else {
            res.status(409).json({ "error": "Entry could not be added" });
        }
        
    } catch (error) {
        res.status(500).json({ "error": "Internal server error" });
    }

};