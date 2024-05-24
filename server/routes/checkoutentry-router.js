const express=require('express');
const coeController=require('../controllers/checkoutentries-controller');

const router=express.Router();

//show all books


//add new Book
router.post('/',coeController.addBookEntries);



module.exports=router;

