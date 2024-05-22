const express=require('express');
const bookController=require('../controllers/book-controller');

const router=express.Router();

//show all books
router.get('/',bookController.getAllBooks);

//add new Book
router.post('/',bookController.addNewBook);





module.exports=router;

