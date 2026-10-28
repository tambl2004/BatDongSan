import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';

const router = Router();

// 1. Thống kê Dashboard
router.get('/stats', AdminController.getStats);

// 2. Quản lý Bất động sản
router.get('/properties', AdminController.getProperties);
router.put('/properties/:id/status', AdminController.updatePropertyStatus);
router.put('/properties/:id/featured', AdminController.togglePropertyFeatured);
router.put('/properties/:id', AdminController.updateProperty);
router.delete('/properties/:id', AdminController.deleteProperty);

// 3. Quản lý Yêu cầu tư vấn (Leads)
router.get('/inquiries', AdminController.getInquiries);
router.put('/inquiries/:id', AdminController.updateInquiry);
router.delete('/inquiries/:id', AdminController.deleteInquiry);

// 4. Quản lý Người dùng & Môi giới
router.get('/users', AdminController.getUsers);
router.post('/users', AdminController.createUser);
router.put('/users/:id', AdminController.updateUser);
router.delete('/users/:id', AdminController.deleteUser);

// 5. Cấu hình hệ thống
router.get('/settings', AdminController.getSettings);
router.put('/settings', AdminController.updateSettings);

export default router;
