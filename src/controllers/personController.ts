import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllPeople = async (req: Request, res: Response) => {
  try {
    const people = await prisma.person.findMany();
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch people' });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const person = await prisma.person.findUnique({
      where: { id: Number(id) },
    });
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch person' });
  }
};

export const createPerson = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, license_number } = req.body;
    const person = await prisma.person.create({
      data: { first_name, last_name, email, license_number },
    });
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create person' });
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, license_number } = req.body;
    const person = await prisma.person.update({
      where: { id: Number(id) },
      data: { first_name, last_name, email, license_number },
    });
    res.json(person);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update person' });
  }
};

export const deletePerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.person.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete person' });
  }
};
