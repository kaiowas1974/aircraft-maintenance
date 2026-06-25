import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getBookings = async (req: Request, res: Response) => {
  const { start, end } = req.query;
  
  const where = {
    start_time: {
      gte: start ? new Date(start as string) : new Date(new Date().setHours(0, 0, 0, 0)),
      lte: end ? new Date(end as string) : new Date(new Date().setHours(23, 59, 59, 999)),
    }
  };

  const bookings = await prisma.booking.findMany({
    where,
    include: {
      aircraft: {
        include: { aircraft_type: true }
      },
      person: true,
    },
  });

  res.json(bookings);
};

export const createBooking = async (req: Request, res: Response) => {
  const { aircraft_id, person_id, start_time, end_time, status, remarks } = req.body;
  
  const booking = await prisma.booking.create({
    data: {
      aircraft_id: Number(aircraft_id),
      person_id: Number(person_id),
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      status: status || 'confirmed',
      remarks,
    },
  });

  res.json(booking);
};

export const deleteBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.booking.delete({
    where: { id: Number(id) },
  });
  res.json({ message: 'Booking deleted' });
};
