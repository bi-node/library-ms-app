const express=require('express');
const bookcopyController=require('../controllers/bookcopy-controller');

const router=express.Router();

//show all books copy
router.get('/',bookcopyController.getAllBooksCopy);
router.get('/:id',bookcopyController.getBookCopiesById);
router.get('/avail/:isbn',bookcopyController.getAvailableBookByISBN);
router.put('/avail/:isbn', bookcopyController.setBook);

module.exports=router;

