const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController.js');
const auth=require('../middleware/authMiddleware');

router.post('/register',authController.register); //post method

module.exports=router;