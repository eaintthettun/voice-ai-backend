const express=require('express');
const router=express.Router();
const authController=require('../controllers/authCotroller');

router.post('/register',authController.register); //post method

module.exports=router;