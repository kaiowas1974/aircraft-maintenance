import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const atcAuthoritiesList = async (req: Request, res: Response) => {
  const authorities = await prisma.atcAuthority.findMany();
  res.render('atc_authorities/index', { authorities });
};

export const atcAuthorityNew = async (req: Request, res: Response) => {
  res.render('atc_authorities/form', { authority: null });
};

export const atcAuthorityEdit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authority = await prisma.atcAuthority.findUnique({
    where: { id: Number(id) },
  });
  if (!authority) {
    return res.status(404).send('ATC Authority not found');
  }
  res.render('atc_authorities/form', { authority });
};

export const atcAuthorityCreate = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  await prisma.atcAuthority.create({
    data: { name, description },
  });
  res.redirect('/atc-authorities');
};

export const atcAuthorityUpdate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  await prisma.atcAuthority.update({
    where: { id: Number(id) },
    data: { name, description },
  });
  res.redirect('/atc-authorities');
};

export const atcAuthorityDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.atcAuthority.delete({
    where: { id: Number(id) },
  });
  res.redirect('/atc-authorities');
};
