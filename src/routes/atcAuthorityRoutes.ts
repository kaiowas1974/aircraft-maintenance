import { Router } from 'express';
import * as atcAuthorityController from '../controllers/atcAuthorityController';

const router = Router();

router.get('/', atcAuthorityController.atcAuthoritiesList);
router.post('/', atcAuthorityController.atcAuthorityCreate);
router.get('/:id', atcAuthorityController.atcAuthoritiesListOne);
router.put('/:id', atcAuthorityController.atcAuthorityUpdate);
router.delete('/:id', atcAuthorityController.atcAuthorityDelete);

export default router;
