const express=require('express');
const router=express.Router();
const diaryEntryController=require('../controllers/diaryEntryController.js');
const auth=require('../middleware/authMiddleware.js');

//prefix  /diaryEntries
router.get('/',auth,diaryEntryController.getDiaryEntries);

module.exports=router;