import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getBookingsPage = async (req: Request, res: Response) => {
  const vereinsflugzeuge = await prisma.aircraft.findMany({
    where: { is_club_aircraft: true },
    include: { aircraft_type: true }
  });

  const people = await prisma.person.findMany();

  res.render('bookings/index', { 
    vereinsflugzeuge,
    people
  });
};
