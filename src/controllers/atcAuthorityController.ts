import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const atcAuthoritiesList = async (req: Request, res: Response) => {
  const authorities = await prisma.atcAuthority.findMany();
  res.json(authorities);
};

export const atcAuthorityCreate = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const authority = await prisma.atcAuthority.create({
    data: { name, description },
  });
  res.json(authority);
};

export const atcAuthoritiesListOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authority = await prisma.atcAuthority.findUnique({
    where: { id: Number(id) },
  });
  if (!authority) {
    return res.status(404).json({ error: 'ATC Authority not found' });
  }
  res.json(authority);
};

export const atcAuthorityUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const authority = await prisma.atcAuthority.update({
    where: { id: Number(id) },
    data: { name, description },
  });
  res.json(authority);
};

export const atcAuthorityDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.atcAuthority.delete({
    where: { id: Number(id) },
  });
  res.json({ message: 'ATC Authority deleted' });
};
