import { Router } from 'express';
import * as uiControllers from '../controllers/uiControllers';

const router = Router();

router.get('/', uiControllers.home);

router.get('/airports', uiControllers.airportsList);
router.get('/airports/new', uiControllers.airportsNew);
router.get('/airports/:id/edit', uiControllers.airportsEdit);

router.get('/hangars', uiControllers.hangarsList);
router.get('/hangars/new', uiControllers.hangarsNew);
router.get('/hangars/:id/edit', uiControllers.hangarsEdit);

router.get('/aircraft-types', uiControllers.aircraftTypesList);
router.get('/aircraft-types/new', uiControllers.aircraftTypesNew);
router.get('/aircraft-types/:id/edit', uiControllers.aircraftTypesEdit);

router.get('/aircraft', uiControllers.aircraftList);
router.get('/aircraft/new', uiControllers.aircraftNew);
router.get('/aircraft/:id/edit', uiControllers.aircraftEdit);

router.get('/people', uiControllers.peopleList);
router.get('/people/new', uiControllers.peopleNew);
router.get('/people/:id/edit', uiControllers.peopleEdit);

export default router;
