import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await prisma.role.findUnique({
      where: { id: Number(id) },
    });
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch role' });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { role_name } = req.body;
    const role = await prisma.role.create({
      data: { role_name },
    });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create role' });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role_name } = req.body;
    const role = await prisma.role.update({
      where: { id: Number(id) },
      data: { role_name },
    });
    res.json(role);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update role' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.role.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete role' });
  }
};
