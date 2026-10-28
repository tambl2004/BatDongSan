import { Router } from 'express';
import propertyRoutes from './property.routes';
import inquiryRoutes from './inquiry.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/inquiries', inquiryRoutes);

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Batdongsan API',
    timestamp: new Date().toISOString()
  });
});

export default router;
