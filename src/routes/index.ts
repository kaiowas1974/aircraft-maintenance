import { Router } from 'express';
import airportRoutes from './airportRoutes';
import hangarRoutes from './hangarRoutes';
import aircraftTypeRoutes from './aircraftTypeRoutes';
import aircraftRoutes from './aircraftRoutes';
import personRoutes from './personRoutes';
import licenseRoutes from './licenseRoutes';
import roleRoutes from './roleRoutes';
import atcAuthorityRoutes from './atcAuthorityRoutes';
import runwayRoutes from './runwayRoutes';

const router = Router();

router.use('/airports', airportRoutes);
router.use('/hangars', hangarRoutes);
router.use('/aircraft-types', aircraftTypeRoutes);
router.use('/aircraft', aircraftRoutes);
router.use('/people', personRoutes);
router.use('/licenses', licenseRoutes);
router.use('/roles', roleRoutes);
router.use('/atc-authorities', atcAuthorityRoutes);
router.use('/runways', runwayRoutes);

export default router;
