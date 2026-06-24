import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const licensesList = async (req: Request, res: Response) => {
  try {
    const licenses = await prisma.license.findMany();
    res.render('licenses/index', { licenses });
  } catch (error) {
    res.status(500).send('Error fetching licenses');
  }
};

export const licensesNew = async (req: Request, res: Response) => {
  res.render('licenses/form', { license: null });
};

export const licensesEdit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const license = await prisma.license.findUnique({
      where: { id: Number(id) },
    });
    if (!license) {
      return res.status(404).send('License not found');
    }
    res.render('licenses/form', { license });
  } catch (error) {
    res.status(500).send('Error fetching license');
  }
};

export const licensesCreate = async (req: Request, res: Response) => {
  try {
    const { license_type, description } = req.body;
    await prisma.license.create({
      data: { license_type, description },
    });
    res.redirect('/licenses');
  } catch (error) {
    res.status(400).send('Error creating license');
  }
};

export const licensesUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { license_type, description } = req.body;
    await prisma.license.update({
      where: { id: Number(id) },
      data: { license_type, description },
    });
    res.redirect('/licenses');
  } catch (error) {
    res.status(400).send('Error updating license');
  }
};

export const licensesDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.license.delete({
      where: { id: Number(id) },
    });
    res.redirect('/licenses');
  } catch (error) {
    res.status(400).send('Error deleting license');
  }
};
