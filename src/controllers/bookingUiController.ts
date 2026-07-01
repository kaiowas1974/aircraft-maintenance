import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import fs from 'fs';
import path from 'path';

export const getBookingsPage = async (req: Request, res: Response) => {
  const vereinsflugzeuge = await prisma.aircraft.findMany({
    where: { is_club_aircraft: true },
    include: { aircraft_type: true }
  });

  const people = await prisma.person.findMany();

  let bookingConfig = { display_hours: { start: 0, end: 23 } };
  try {
    const configPath = path.resolve(__dirname, '../config/booking.json');
    bookingConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (err) {
    console.error('Error loading booking config:', err);
  }

  res.render('bookings/index', { 
    vereinsflugzeuge,
    people,
    bookingConfig
  });
};
