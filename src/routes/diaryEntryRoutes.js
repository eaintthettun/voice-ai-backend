import { Router } from 'express';

const router = Router();

import diaryEntryController from '../controllers/diaryEntryController.js';
import auth from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

// prefix: /diaryEntries

// Static routes
router.get('/', auth, diaryEntryController.getDiaryEntries);

router.get('/recent', auth, diaryEntryController.getRecentDiaryEntries);

router.get('/search', auth, diaryEntryController.searchDiaryEntries);

router.post('/transcribe', auth, upload.single('audio'), diaryEntryController.transcribeDiaryEntry);

router.post('/', auth, diaryEntryController.createDiaryEntry);

router.get('/favorite', auth, diaryEntryController.getFavoriteDiaryEntries);

router.get('/statistics/current-week/trend', auth, diaryEntryController.getCurrentWeekTrend);
router.get('/statistics/current-week/summary', auth, diaryEntryController.getCurrentWeekSummary);

// Dynamic routes
router.get('/category/:categoryName', auth, diaryEntryController.getDiaryEntriesByCategory);

router.get('/:id', auth, diaryEntryController.getDiaryEntryDetail);

router.delete('/:id', auth, diaryEntryController.deleteDiaryEntry);

router.put('/:id', auth, diaryEntryController.editDiaryEntry);

router.patch('/:id/favorite', auth, diaryEntryController.toggleFavoriteDiaryEntry);


export default router;