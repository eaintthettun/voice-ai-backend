import { Router } from 'express';
const router=Router();
import diaryEntryController from '../controllers/diaryEntryController.js';
import auth from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

//prefix  /diaryEntries
router.get('/recent',auth,diaryEntryController.getRecentDiaryEntries);
router.get('/',auth,diaryEntryController.getDiaryEntries);
router.post('/transcribe',auth,upload.single('audio'),diaryEntryController.transcribeDiaryEntry);
router.post('/',auth,diaryEntryController.createDiaryEntry);
router.delete('/:id',auth,diaryEntryController.deleteDiaryEntry);
router.put('/:id',auth,diaryEntryController.editDiaryEntry);
router.get('/',auth,diaryEntryController.getDiaryEntries);
router.get('/:id',auth,diaryEntryController.getDiaryEntryDetail);
router.get('/category',auth,diaryEntryController.getDiaryEntriesByCategory);

export default router;