import { Router } from 'express';
import * as atcAuthorityUiController from '../controllers/atcAuthorityUiController';

const router = Router();

router.get('/', atcAuthorityUiController.atcAuthoritiesList);
router.get('/new', atcAuthorityUiController.atcAuthorityNew);
router.get('/:id/edit', atcAuthorityUiController.atcAuthorityEdit);
router.post('/', atcAuthorityUiController.atcAuthorityCreate);
router.post('/:id', atcAuthorityUiController.atcAuthorityUpdate); // Using POST for update to simplify EJS forms
router.post('/:id/delete', atcAuthorityUiController.atcAuthorityDelete);

export default router;
