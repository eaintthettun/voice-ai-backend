import { Router } from 'express';

const router = Router();

import diaryEntryController from '../controllers/diaryEntryController.js';
import auth from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

// prefix: /diaryEntries

// Static routes
router.get('/recent', auth, diaryEntryController.getRecentDiaryEntries);

router.get('/searchKeyword', auth, diaryEntryController.searchDiaryEntries);

router.post('/transcribe', auth, upload.single('audio'), diaryEntryController.transcribeDiaryEntry);

router.post('/', auth, diaryEntryController.createDiaryEntry);

router.get('/', auth, diaryEntryController.getDiaryEntries);

router.get(
  "/dateRange",
  auth,
  diaryEntryController.findDiaryEntriesByDateRange
);

// Dynamic routes
router.get('/category/:categoryName', auth, diaryEntryController.getDiaryEntriesByCategory);

router.get('/:id', auth, diaryEntryController.getDiaryEntryDetail);

router.delete('/:id', auth, diaryEntryController.deleteDiaryEntry);

router.put('/:id', auth, diaryEntryController.editDiaryEntry);

export default router;