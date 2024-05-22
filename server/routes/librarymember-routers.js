const express=require('express');
const librarymemberController=require('../controllers/library-member-controller');

const router=express.Router();

//show all memeber
router.get('/',librarymemberController.getAllMembers);
//add new library members
router.post('/',librarymemberController.addNewMember)


module.exports=router;

