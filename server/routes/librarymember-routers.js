const express=require('express');
const librarymemberController=require('../controllers/library-member-controller');

const router=express.Router();


router.get('/',librarymemberController.getAllMembers);


module.exports=router;

