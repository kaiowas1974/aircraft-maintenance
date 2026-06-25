import { Router } from 'express';
import * as bookingUiController from '../controllers/bookingUiController';

const router = Router();

router.get('/', bookingUiController.getBookingsPage);

export default router;
