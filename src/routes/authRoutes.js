const express=require('express');
const router=express.Router();
const authController=require('../controllers/authCotroller');

router.post('/register',authController.register); //post method
router.post('/login',authController.login); //post method

module.exports=router;