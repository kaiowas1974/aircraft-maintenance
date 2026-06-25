import { Router } from 'express';
import airportRoutes from './airportRoutes';
import aircraftTypeRoutes from './aircraftTypeRoutes';
import aircraftRoutes from './aircraftRoutes';
import personRoutes from './personRoutes';
import licenseRoutes from './licenseRoutes';
import roleRoutes from './roleRoutes';
import atcAuthorityRoutes from './atcAuthorityRoutes';
import bookingRoutes from './bookingRoutes';

const router = Router();

router.use('/airports', airportRoutes);
router.use('/aircraft-types', aircraftTypeRoutes);
router.use('/aircraft', aircraftRoutes);
router.use('/people', personRoutes);
router.use('/licenses', licenseRoutes);
router.use('/roles', roleRoutes);
router.use('/atc-authorities', atcAuthorityRoutes);
router.use('/bookings', bookingRoutes);

export default router;
