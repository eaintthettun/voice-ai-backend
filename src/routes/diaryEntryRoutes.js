import { Router } from 'express';
const router=Router();
import diaryEntryController from '../controllers/diaryEntryController.js';
import auth from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

//prefix  /diaryEntries
router.get('/recent',auth,diaryEntryController.getRecentDiaryEntries);
router.get('/',auth,diaryEntryController.getDiaryEntries);
router.post('/transcribe',auth,upload.single('audio'),diaryEntryController.transcribeDiaryEntry);

export default router;