import { Router } from 'express';
const router = Router();
import { register, login } from '../controllers/authController';

router.post('/register', register); // post method
router.post('/login', login); // post method

export default router;