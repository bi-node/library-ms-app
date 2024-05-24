const express=require('express');
const bookcopyController=require('../controllers/bookcopy-controller');

const router=express.Router();

//show all books copy
router.get('/',bookcopyController.getAllBooksCopy);

module.exports=router;

