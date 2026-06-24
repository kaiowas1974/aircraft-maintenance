import { Router } from 'express';
import * as aircraftTypeController from '../controllers/aircraftTypeController';

const router = Router();

router.get('/', aircraftTypeController.getAllAircraftTypes);
router.get('/:id', aircraftTypeController.getAircraftTypeById);
router.post('/', aircraftTypeController.createAircraftType);
router.put('/:id', aircraftTypeController.updateAircraftType);
router.delete('/:id', aircraftTypeController.deleteAircraftType);

export default router;
