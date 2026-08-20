import { Router } from 'express';
const router=Router();
import diaryEntryController from '../controllers/diaryEntryController.js';
import auth from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

//prefix  /diaryEntries
router.get('/',auth,diaryEntryController.getDiaryEntries);
router.post('/',auth,upload.single('audio'),diaryEntryController.createDiaryEntry);

export default router;