const express=require('express');
const router=express.Router();
const diaryEntryController=require('../controllers/diaryEntryController.js');
const auth=require('../middleware/auth.js');

//prefix  /diaryEntries
router.get('/get',auth,diaryEntryController.getDiaryEntries); //get method

module.exports=router;