import { Router } from 'express';
import * as licenseController from '../controllers/licenseController';

const router = Router();

router.get('/', licenseController.getAllLicenses);
router.get('/:id', licenseController.getLicenseById);
router.post('/', licenseController.createLicense);
router.post('/:id', licenseController.updateLicense);
router.delete('/:id', licenseController.deleteLicense);

export default router;
