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

export const airportsCreate = async (req: Request, res: Response) => {
  const { icao, iata, name, city } = req.body;
  await prisma.airport.create({
    data: { icao, iata, name, city },
  });
  res.redirect('/airports');
};

export const airportsUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { icao, iata, name, city } = req.body;
  await prisma.airport.update({
    where: { id: Number(id) },
    data: { icao, iata, name, city },
  });
  res.redirect('/airports');
};

export const airportsDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.airport.delete({
    where: { id: Number(id) },
  });
  res.redirect('/airports');
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

export const hangarsCreate = async (req: Request, res: Response) => {
  const { airport_id, name, capacity } = req.body;
  await prisma.hangar.create({
    data: {
      airport_id: Number(airport_id),
      name,
      capacity: capacity ? Number(capacity) : null,
    },
  });
  res.redirect('/hangars');
};

export const hangarsUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { airport_id, name, capacity } = req.body;
  await prisma.hangar.update({
    where: { id: Number(id) },
    data: {
      airport_id: Number(airport_id),
      name,
      capacity: capacity ? Number(capacity) : null,
    },
  });
  res.redirect('/hangars');
};

export const hangarsDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.hangar.delete({
    where: { id: Number(id) },
  });
  res.redirect('/hangars');
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

export const aircraftTypesCreate = async (req: Request, res: Response) => {
  const { manufacturer, model } = req.body;
  await prisma.aircraftType.create({
    data: { manufacturer, model },
  });
  res.redirect('/aircraft-types');
};

export const aircraftTypesUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { manufacturer, model } = req.body;
  await prisma.aircraftType.update({
    where: { id: Number(id) },
    data: { manufacturer, model },
  });
  res.redirect('/aircraft-types');
};

export const aircraftTypesDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.aircraftType.delete({
    where: { id: Number(id) },
  });
  res.redirect('/aircraft-types');
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

export const aircraftCreate = async (req: Request, res: Response) => {
  const {
    registration,
    type_id,
    home_airport_id,
    current_hangar_id,
    total_flight_hours,
    manufacture_date,
    airworthiness_expiry,
    status,
  } = req.body;
  await prisma.aircraft.create({
    data: {
      registration,
      type_id: Number(type_id),
      home_airport_id: home_airport_id ? Number(home_airport_id) : null,
      current_hangar_id: current_hangar_id ? Number(current_hangar_id) : null,
      total_flight_hours: total_flight_hours ? Number(total_flight_hours) : 0,
      manufacture_date: manufacture_date ? new Date(manufacture_date) : null,
      airworthiness_expiry: airworthiness_expiry ? new Date(airworthiness_expiry) : null,
      status,
    },
  });
  res.redirect('/aircraft');
};

export const aircraftUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    registration,
    type_id,
    home_airport_id,
    current_hangar_id,
    total_flight_hours,
    manufacture_date,
    airworthiness_expiry,
    status,
  } = req.body;
  await prisma.aircraft.update({
    where: { id: Number(id) },
    data: {
      registration,
      type_id: Number(type_id),
      home_airport_id: home_airport_id ? Number(home_airport_id) : null,
      current_hangar_id: current_hangar_id ? Number(current_hangar_id) : null,
      total_flight_hours: total_flight_hours ? Number(total_flight_hours) : 0,
      manufacture_date: manufacture_date ? new Date(manufacture_date) : null,
      airworthiness_expiry: airworthiness_expiry ? new Date(airworthiness_expiry) : null,
      status,
    },
  });
  res.redirect('/aircraft');
};

export const aircraftDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.aircraft.delete({
    where: { id: Number(id) },
  });
  res.redirect('/aircraft');
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

export const peopleCreate = async (req: Request, res: Response) => {
  const { first_name, last_name, email, license_number } = req.body;
  await prisma.person.create({
    data: { first_name, last_name, email, license_number },
  });
  res.redirect('/people');
};

export const peopleUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { first_name, last_name, email, license_number } = req.body;
  await prisma.person.update({
    where: { id: Number(id) },
    data: { first_name, last_name, email, license_number },
  });
  res.redirect('/people');
};

export const peopleDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.person.delete({
    where: { id: Number(id) },
  });
  res.redirect('/people');
};
