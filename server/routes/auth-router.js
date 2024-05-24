const express=require('express');
const authController=require('../controllers/user-auth-controller');

const router=express.Router();


router.post('/login', authController.getAuthentication);
//router.post('/logout',authController.logout);


module.exports=router;

