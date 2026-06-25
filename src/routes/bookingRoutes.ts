import { Router } from 'express';
import * as bookingController from '../controllers/bookingController';

const router = Router();

router.get('/', bookingController.getBookings);
router.post('/', bookingController.createBooking);
router.delete('/:id', bookingController.deleteBooking);

export default router;
