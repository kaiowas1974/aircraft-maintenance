import { Router } from 'express';
import * as roleController from '../controllers/roleController';

const router = Router();

router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRoleById);
router.post('/', roleController.createRole);
router.post('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

export default router;
