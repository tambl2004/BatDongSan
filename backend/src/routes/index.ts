import { Router } from 'express';
import propertyRoutes from './property.routes';
import inquiryRoutes from './inquiry.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import { VIETNAM_LOCATIONS } from '../models/location.model';

const router = Router();

router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/users', userRoutes);

// Location endpoint phục vụ bộ lọc tìm kiếm
router.get('/locations', (_req, res) => {
  res.status(200).json({
    success: true,
    data: VIETNAM_LOCATIONS
  });
});

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Batdongsan API',
    timestamp: new Date().toISOString()
  });
});

export default router;
