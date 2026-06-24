import { Router } from 'express';
import * as roleUiController from '../controllers/roleUiController';

const router = Router();

router.get('/', roleUiController.rolesList);
router.get('/new', roleUiController.rolesNew);
router.get('/:id/edit', roleUiController.rolesEdit);
router.post('/', roleUiController.rolesCreate);
router.post('/:id', roleUiController.rolesUpdate);
router.post('/:id/delete', roleUiController.rolesDelete);

export default router;
