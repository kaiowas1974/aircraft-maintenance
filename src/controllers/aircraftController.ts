import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllAircraft = async (req: Request, res: Response) => {
  try {
    const aircrafts = await prisma.aircraft.findMany({
      include: {
        aircraft_type: true,
        home_airport: true,
        current_hangar: true,
      }
    });
    res.json(aircrafts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch aircraft' });
  }
};

export const getAircraftById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const aircraft = await prisma.aircraft.findUnique({
      where: { id: Number(id) },
      include: {
        aircraft_type: true,
        home_airport: true,
        current_hangar: true,
      }
    });
    if (!aircraft) {
      return res.status(404).json({ error: 'Aircraft not found' });
    }
    res.json(aircraft);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch aircraft' });
  }
};

export const createAircraft = async (req: Request, res: Response) => {
  try {
    const { registration, type_id, home_airport_id, current_hangar_id, total_flight_hours, manufacture_date, airworthiness_expiry, status } = req.body;
    const aircraft = await prisma.aircraft.create({
      data: {
        registration,
        type_id,
        home_airport_id,
        current_hangar_id,
        total_flight_hours,
        manufacture_date: manufacture_date ? new Date(manufacture_date) : null,
        airworthiness_expiry: airworthiness_expiry ? new Date(airworthiness_expiry) : null,
        status,
      },
    });
    res.status(201).json(aircraft);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create aircraft' });
  }
};

export const updateAircraft = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { registration, type_id, home_airport_id, current_hangar_id, total_flight_hours, manufacture_date, airworthiness_expiry, status } = req.body;
    const aircraft = await prisma.aircraft.update({
      where: { id: Number(id) },
      data: {
        registration,
        type_id,
        home_airport_id,
        current_hangar_id,
        total_flight_hours,
        manufacture_date: manufacture_date ? new Date(manufacture_date) : undefined,
        airworthiness_expiry: airworthiness_expiry ? new Date(airworthiness_expiry) : undefined,
        status,
      },
    });
    res.json(aircraft);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update aircraft' });
  }
};

export const deleteAircraft = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.aircraft.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete aircraft' });
  }
};
