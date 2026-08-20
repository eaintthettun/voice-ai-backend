import { Router } from 'express';
const router = Router();
import authController from '../controllers/authController.js';

router.post('/register', authController.register); // post method
router.post('/login', authController.login); // post method

export default router;