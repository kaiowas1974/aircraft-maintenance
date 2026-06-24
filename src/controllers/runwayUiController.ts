import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const runwaysList = async (req: Request, res: Response) => {
  const runways = await prisma.runway.findMany({
    include: { airport: true }
  });
  res.render('runways/index', { runways });
};

export const runwayNew = async (req: Request, res: Response) => {
  const airports = await prisma.airport.findMany();
  res.render('runways/form', { runway: null, airports });
};

export const runwayEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const runway = await prisma.runway.findUnique({
    where: { id: Number(id) },
    include: { airport: true }
  });
  if (!runway) {
    return res.status(404).send('Runway not found');
  }
  const airports = await prisma.airport.findMany();
  res.render('runways/form', { runway, airports });
};

export const runwayCreate = async (req: Request, res: Response) => {
  const { airport_id, designator, length_meters, surface } = req.body;
  await prisma.runway.create({
    data: {
      airport_id: Number(airport_id),
      designator,
      length_meters: length_meters ? Number(length_meters) : null,
      surface,
    },
  });
  res.redirect('/runways');
};

export const runwayUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { airport_id, designator, length_meters, surface } = req.body;
  await prisma.runway.update({
    where: { id: Number(id) },
    data: {
      airport_id: Number(airport_id),
      designator,
      length_meters: length_meters ? Number(length_meters) : null,
      surface,
    },
  });
  res.redirect('/runways');
};

export const runwayDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.runway.delete({
    where: { id: Number(id) },
  });
  res.redirect('/runways');
};
