import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllAirports = async (req: Request, res: Response) => {
  try {
    const airports = await prisma.airport.findMany();
    res.json(airports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch airports' });
  }
};

export const getAirportById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const airport = await prisma.airport.findUnique({
      where: { id: Number(id) },
    });
    if (!airport) {
      return res.status(404).json({ error: 'Airport not found' });
    }
    res.json(airport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch airport' });
  }
};

export const createAirport = async (req: Request, res: Response) => {
  try {
    const { icao, iata, name, city } = req.body;
    const airport = await prisma.airport.create({
      data: { icao, iata, name, city },
    });
    res.status(201).json(airport);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create airport' });
  }
};

export const updateAirport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { icao, iata, name, city } = req.body;
    const airport = await prisma.airport.update({
      where: { id: Number(id) },
      data: { icao, iata, name, city },
    });
    res.json(airport);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update airport' });
  }
};

export const deleteAirport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.airport.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete airport' });
  }
};
