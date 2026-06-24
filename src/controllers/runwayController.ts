import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const runwaysList = async (req: Request, res: Response) => {
  const runways = await prisma.runway.findMany({
    include: { airport: true }
  });
  res.json(runways);
};

export const runwayCreate = async (req: Request, res: Response) => {
  const { airport_id, designator, length_meters, surface } = req.body;
  const runway = await prisma.runway.create({
    data: {
      airport_id: Number(airport_id),
      designator,
      length_meters: length_meters ? Number(length_meters) : null,
      surface,
    },
  });
  res.json(runway);
};

export const runwaysListByAirport = async (req: Request, res: Response) => {
  const { airport_id } = req.params;
  const runways = await prisma.runway.findMany({
    where: { airport_id: Number(airport_id) }
  });
  res.json(runways);
};

export const runwayUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { designator, length_meters, surface } = req.body;
  const runway = await prisma.runway.update({
    where: { id: Number(id) },
    data: {
      designator,
      length_meters: length_meters ? Number(length_meters) : null,
      surface,
    },
  });
  res.json(runway);
};

export const runwayDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.runway.delete({
    where: { id: Number(id) },
  });
  res.json({ message: 'Runway deleted' });
};
