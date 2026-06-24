import { Router } from 'express';
import * as hangarController from '../controllers/hangarController';

const router = Router();

router.get('/', hangarController.getAllHangars);
router.get('/:id', hangarController.getHangarById);
router.post('/', hangarController.createHangar);
router.put('/:id', hangarController.updateHangar);
router.delete('/:id', hangarController.deleteHangar);

export default router;
