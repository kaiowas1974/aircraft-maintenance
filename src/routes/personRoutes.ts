import { Router } from 'express';
import * as personController from '../controllers/personController';

const router = Router();

router.get('/', personController.getAllPeople);
router.get('/:id', personController.getPersonById);
router.post('/', personController.createPerson);
router.put('/:id', personController.updatePerson);
router.delete('/:id', personController.deletePerson);

export default router;
