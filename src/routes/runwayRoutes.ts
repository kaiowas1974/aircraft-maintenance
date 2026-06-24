import { Router } from 'express';
import * as runwayController from '../controllers/runwayController';

const router = Router();

router.get('/', runwayController.runwaysList);
router.get('/:airport_id', runwayController.runwaysListByAirport);
router.post('/', runwayController.runwayCreate);
router.put('/:id', runwayController.runwayUpdate);
router.delete('/:id', runwayController.runwayDelete);

export default router;
