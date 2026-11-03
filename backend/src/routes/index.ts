import { Router } from 'express';
import propertyRoutes from './property.routes';
import inquiryRoutes from './inquiry.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import adminRoutes from './admin.routes';
import { VIETNAM_LOCATIONS } from '../models/location.model';
import { dbConnection, getPool } from '../config/db';

const router = Router();

router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/inquiries', inquiryRoutes);
router.use('/users', userRoutes);
router.use('/admin', adminRoutes);

// Location endpoint phục vụ bộ lọc tìm kiếm
router.get('/locations', (_req, res) => {
  res.status(200).json({
    success: true,
    data: VIETNAM_LOCATIONS
  });
});

router.get('/health', async (_req, res) => {
  let dbStatus = 'disconnected';
  try {
    if (dbConnection.isConnected) {
      const conn = await getPool().getConnection();
      await conn.ping();
      conn.release();
      dbStatus = 'connected';
    }
  } catch {
    dbStatus = 'error';
  }

  const isHealthy = dbStatus === 'connected';
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'ok' : 'unhealthy',
    service: 'Batdongsan API',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

export default router;
