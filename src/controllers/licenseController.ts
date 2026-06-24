import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllLicenses = async (req: Request, res: Response) => {
  try {
    const licenses = await prisma.license.findMany();
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch licenses' });
  }
};

export const getLicenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const license = await prisma.license.findUnique({
      where: { id: Number(id) },
    });
    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }
    res.json(license);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch license' });
  }
};

export const createLicense = async (req: Request, res: Response) => {
  try {
    const { license_type, description } = req.body;
    const license = await prisma.license.create({
      data: { license_type, description },
    });
    res.status(201).json(license);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create license' });
  }
};

export const updateLicense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { license_type, description } = req.body;
    const license = await prisma.license.update({
      where: { id: Number(id) },
      data: { license_type, description },
    });
    res.json(license);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update license' });
  }
};

export const deleteLicense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.license.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete license' });
  }
};
