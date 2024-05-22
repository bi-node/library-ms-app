const express=require('express');
const bookController=require('../controllers/book-controller');

const router=express.Router();

//show all memeber
router.get('/',bookController.getAllBooks);



module.exports=router;

