import { Router } from 'express';
const router=Router();
import { getDiaryEntries, createDiaryEntry } from '../controllers/diaryEntryController.js';
import auth from '../middleware/authMiddleware.js';

//prefix  /diaryEntries
router.get('/',auth,getDiaryEntries);
router.post('/',auth,createDiaryEntry);

export default router;