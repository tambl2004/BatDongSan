import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.post('/forgot-password', (req, res) => authController.forgotPassword(req, res));
router.post('/social', (req, res) => authController.socialLogin(req, res));
router.get('/me', (req, res) => authController.getCurrentUser(req, res));

export default router;
