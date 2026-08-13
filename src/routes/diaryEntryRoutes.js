import { Router } from 'express';
const router=Router();
import { getDiaryEntries, createDiaryEntry } from '../controllers/diaryEntryController.js';
import auth from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

//prefix  /diaryEntries
router.get('/',auth,getDiaryEntries);
router.post('/',auth,upload.single('audio'),createDiaryEntry);

export default router;