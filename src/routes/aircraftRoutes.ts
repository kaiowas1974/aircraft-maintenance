import { Router } from 'express';
import * as aircraftController from '../controllers/aircraftController';

const router = Router();

router.get('/', aircraftController.getAllAircraft);
router.get('/:id', aircraftController.getAircraftById);
router.post('/', aircraftController.createAircraft);
router.put('/:id', aircraftController.updateAircraft);
router.delete('/:id', aircraftController.deleteAircraft);

export default router;
