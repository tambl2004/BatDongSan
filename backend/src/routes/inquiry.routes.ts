import { Router } from 'express';
import { InquiryController } from '../controllers/inquiry.controller';

const router = Router();

router.post('/', InquiryController.createInquiry);
router.get('/', InquiryController.getInquiries);

export default router;
