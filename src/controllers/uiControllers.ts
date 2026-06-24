import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const home = async (req: Request, res: Response) => {
  res.render('index');
};

// Airports
export const airportsList = async (req: Request, res: Response) => {
  const airports = await prisma.airport.findMany();
  res.render('airports/index', { airports });
};

export const airportsNew = async (req: Request, res: Response) => {
  res.render('airports/form', { airport: null });
};

export const airportsEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const airport = await prisma.airport.findUnique({
    where: { id: Number(id) },
  });
  if (!airport) {
    return res.status(404).send('Airport not found');
  }
  res.render('airports/form', { airport });
};

// Hangars
export const hangarsList = async (req: Request, res: Response) => {
  const hangars = await prisma.hangar.findMany({
    include: { airport: true },
  });
  res.render('hangars/index', { hangars });
};

export const hangarsNew = async (req: Request, res: Response) => {
  const airports = await prisma.airport.findMany();
  res.render('hangars/form', { hangar: null, airports });
};

export const hangarsEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hangar = await prisma.hangar.findUnique({
    where: { id: Number(id) },
    include: { airport: true },
  });
  if (!hangar) {
    return res.status(404).send('Hangar not found');
  }
  const airports = await prisma.airport.findMany();
  res.render('hangars/form', { hangar, airports });
};

// Aircraft Types
export const aircraftTypesList = async (req: Request, res: Response) => {
  const aircraftTypes = await prisma.aircraftType.findMany();
  res.render('aircraft-types/index', { aircraftTypes });
};

export const aircraftTypesNew = async (req: Request, res: Response) => {
  res.render('aircraft-types/form', { aircraftType: null });
};

export const aircraftTypesEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const aircraftType = await prisma.aircraftType.findUnique({
    where: { id: Number(id) },
  });
  if (!aircraftType) {
    return res.status(404).send('Aircraft Type not found');
  }
  res.render('aircraft-types/form', { aircraftType });
};

// Aircraft
export const aircraftList = async (req: Request, res: Response) => {
  const aircraft = await prisma.aircraft.findMany({
    include: {
      aircraft_type: true,
      home_airport: true,
      current_hangar: true,
    },
  });
  res.render('aircraft/index', { aircraft });
};

export const aircraftNew = async (req: Request, res: Response) => {
  const aircraftTypes = await prisma.aircraftType.findMany();
  const airports = await prisma.airport.findMany();
  const hangars = await prisma.hangar.findMany();
  res.render('aircraft/form', { aircraft: null, aircraftTypes, airports, hangars });
};

export const aircraftEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const aircraft = await prisma.aircraft.findUnique({
    where: { id: Number(id) },
    include: {
      aircraft_type: true,
      home_airport: true,
      current_hangar: true,
    },
  });
  if (!aircraft) {
    return res.status(404).send('Aircraft not found');
  }
  const aircraftTypes = await prisma.aircraftType.findMany();
  const airports = await prisma.airport.findMany();
  const hangars = await prisma.hangar.findMany();
  res.render('aircraft/form', { aircraft, aircraftTypes, airports, hangars });
};

// People
export const peopleList = async (req: Request, res: Response) => {
  const people = await prisma.person.findMany();
  res.render('people/index', { people });
};

export const peopleNew = async (req: Request, res: Response) => {
  res.render('people/form', { person: null });
};

export const peopleEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const person = await prisma.person.findUnique({
    where: { id: Number(id) },
  });
  if (!person) {
    return res.status(404).send('Person not found');
  }
  res.render('people/form', { person });
};
