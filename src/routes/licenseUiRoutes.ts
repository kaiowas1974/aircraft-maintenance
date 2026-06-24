import { Router } from 'express';
import * as licenseUiController from '../controllers/licenseUiController';

const router = Router();

router.get('/', licenseUiController.licensesList);
router.get('/new', licenseUiController.licensesNew);
router.get('/:id/edit', licenseUiController.licensesEdit);
router.post('/', licenseUiController.licensesCreate);
router.post('/:id', licenseUiController.licensesUpdate);
router.post('/:id/delete', licenseUiController.licensesDelete);

export default router;
