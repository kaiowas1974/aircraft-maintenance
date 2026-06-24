import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllHangars = async (req: Request, res: Response) => {
  try {
    const hangars = await prisma.hangar.findMany({
      include: { airport: true }
    });
    res.json(hangars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hangars' });
  }
};

export const getHangarById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const hangar = await prisma.hangar.findUnique({
      where: { id: Number(id) },
      include: { airport: true }
    });
    if (!hangar) {
      return res.status(404).json({ error: 'Hangar not found' });
    }
    res.json(hangar);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hangar' });
  }
};

export const createHangar = async (req: Request, res: Response) => {
  try {
    const { airport_id, name, capacity } = req.body;
    const hangar = await prisma.hangar.create({
      data: { airport_id, name, capacity },
    });
    res.status(201).json(hangar);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create hangar' });
  }
};

export const updateHangar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { airport_id, name, capacity } = req.body;
    const hangar = await prisma.hangar.update({
      where: { id: Number(id) },
      data: { airport_id, name, capacity },
    });
    res.json(hangar);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update hangar' });
  }
};

export const deleteHangar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.hangar.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete hangar' });
  }
};
