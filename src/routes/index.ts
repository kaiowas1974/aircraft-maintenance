import { Router } from 'express';
import airportRoutes from './airportRoutes';
import hangarRoutes from './hangarRoutes';
import aircraftTypeRoutes from './aircraftTypeRoutes';
import aircraftRoutes from './aircraftRoutes';
import personRoutes from './personRoutes';
import uiRoutes from './uiRoutes';

const router = Router();

router.use('/', uiRoutes);
router.use('/airports', airportRoutes);
router.use('/hangars', hangarRoutes);
router.use('/aircraft-types', aircraftTypeRoutes);
router.use('/aircraft', aircraftRoutes);
router.use('/people', personRoutes);

export default router;
