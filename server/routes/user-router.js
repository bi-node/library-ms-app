const express=require('express');
const userController=require('../controllers/user-controller');

const router=express.Router();

//show all books
router.get('/',userController.getAllUsers);

module.exports=router;

