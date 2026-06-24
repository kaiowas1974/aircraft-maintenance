import { Router } from 'express';
import * as uiControllers from '../controllers/uiControllers';

const router = Router();

router.get('/', uiControllers.home);

// Airports
router.get('/airports', uiControllers.airportsList);
router.get('/airports/new', uiControllers.airportsNew);
router.get('/airports/:id/edit', uiControllers.airportsEdit);
router.post('/airports', uiControllers.airportsCreate);
router.post('/airports/:id', uiControllers.airportsUpdate);
router.post('/airports/:id/delete', uiControllers.airportsDelete);

// Hangars
router.get('/hangars', uiControllers.hangarsList);
router.get('/hangars/new', uiControllers.hangarsNew);
router.get('/hangars/:id/edit', uiControllers.hangarsEdit);
router.post('/hangars', uiControllers.hangarsCreate);
router.post('/hangars/:id', uiControllers.hangarsUpdate);
router.post('/hangars/:id/delete', uiControllers.hangarsDelete);

// Aircraft Types
router.get('/aircraft-types', uiControllers.aircraftTypesList);
router.get('/aircraft-types/new', uiControllers.aircraftTypesNew);
router.get('/aircraft-types/:id/edit', uiControllers.aircraftTypesEdit);
router.post('/aircraft-types', uiControllers.aircraftTypesCreate);
router.post('/aircraft-types/:id', uiControllers.aircraftTypesUpdate);
router.post('/aircraft-types/:id/delete', uiControllers.aircraftTypesDelete);

// Aircraft
router.get('/aircraft', uiControllers.aircraftList);
router.get('/aircraft/new', uiControllers.aircraftNew);
router.get('/aircraft/:id/edit', uiControllers.aircraftEdit);
router.post('/aircraft', uiControllers.aircraftCreate);
router.post('/aircraft/:id', uiControllers.aircraftUpdate);
router.post('/aircraft/:id/delete', uiControllers.aircraftDelete);

// People
router.get('/people', uiControllers.peopleList);
router.get('/people/new', uiControllers.peopleNew);
router.get('/people/:id/edit', uiControllers.peopleEdit);
router.post('/people', uiControllers.peopleCreate);
router.post('/people/:id', uiControllers.peopleUpdate);
router.post('/people/:id/delete', uiControllers.peopleDelete);

export default router;
