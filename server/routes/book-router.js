const express=require('express');
const bookController=require('../controllers/book-controller');

const router=express.Router();

//show all books
router.get('/',bookController.getAllBooks);

router.get('/book',bookController.getBookById);

router.get('/:id', bookController.getBookById)

//add new Book
router.post('/',bookController.addNewBook);

//add book copy
router.post('/addbookcopy', bookController.addCopy);






module.exports=router;

