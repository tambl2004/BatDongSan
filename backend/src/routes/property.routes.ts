import { Router } from 'express';
import { PropertyController } from '../controllers/property.controller';

const router = Router();

router.get('/featured', PropertyController.getFeaturedProperties);
router.get('/locations', PropertyController.getLocations);
router.get('/', PropertyController.getProperties);
router.get('/:id', PropertyController.getPropertyById);
router.post('/', PropertyController.createProperty);

export default router;
