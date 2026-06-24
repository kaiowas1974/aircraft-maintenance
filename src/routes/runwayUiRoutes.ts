import { Router } from 'express';
import * as runwayUiController from '../controllers/runwayUiController';

const router = Router();

router.get('/', runwayUiController.runwaysList);
router.get('/new', runwayUiController.runwayNew);
router.get('/:id/edit', runwayUiController.runwayEdit);
router.post('/', runwayUiController.runwayCreate);
router.post('/:id', runwayUiController.runwayUpdate);
router.post('/:id/delete', runwayUiController.runwayDelete);

export default router;
