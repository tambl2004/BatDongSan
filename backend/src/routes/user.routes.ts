import { Router } from 'express';
import { getProfile, updateProfile, getFavorites } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/favorites', protect, getFavorites);

export default router;
