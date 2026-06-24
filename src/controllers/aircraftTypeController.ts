import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllAircraftTypes = async (req: Request, res: Response) => {
  try {
    const types = await prisma.aircraftType.findMany();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch aircraft types' });
  }
};

export const getAircraftTypeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const type = await prisma.aircraftType.findUnique({
      where: { id: Number(id) },
    });
    if (!type) {
      return res.status(404).json({ error: 'Aircraft type not found' });
    }
    res.json(type);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch aircraft type' });
  }
};

export const createAircraftType = async (req: Request, res: Response) => {
  try {
    const { manufacturer, model } = req.body;
    const type = await prisma.aircraftType.create({
      data: { manufacturer, model },
    });
    res.status(201).json(type);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create aircraft type' });
  }
};

export const updateAircraftType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { manufacturer, model } = req.body;
    const type = await prisma.aircraftType.update({
      where: { id: Number(id) },
      data: { manufacturer, model },
    });
    res.json(type);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update aircraft type' });
  }
};

export const deleteAircraftType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.aircraftType.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete aircraft type' });
  }
};
