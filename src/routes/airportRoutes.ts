import { Router } from 'express';
import * as airportController from '../controllers/airportController';

const router = Router();

router.get('/', airportController.getAllAirports);
router.get('/:id', airportController.getAirportById);
router.post('/', airportController.createAirport);
router.post('/:id', airportController.updateAirport);
router.delete('/:id', airportController.deleteAirport);

export default router;
