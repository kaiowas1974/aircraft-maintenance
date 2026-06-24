import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const rolesList = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany();
    res.render('roles/index', { roles });
  } catch (error) {
    res.status(500).send('Error fetching roles');
  }
};

export const rolesNew = async (req: Request, res: Response) => {
  res.render('roles/form', { role: null });
};

export const rolesEdit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await prisma.role.findUnique({
      where: { id: Number(id) },
    });
    if (!role) {
      return res.status(404).send('Role not found');
    }
    res.render('roles/form', { role });
  } catch (error) {
    res.status(500).send('Error fetching role');
  }
};

export const rolesCreate = async (req: Request, res: Response) => {
  try {
    const { role_name } = req.body;
    await prisma.role.create({
      data: { role_name },
    });
    res.redirect('/roles');
  } catch (error) {
    res.status(400).send('Error creating role');
  }
};

export const rolesUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role_name } = req.body;
    await prisma.role.update({
      where: { id: Number(id) },
      data: { role_name },
    });
    res.redirect('/roles');
  } catch (error) {
    res.status(400).send('Error updating role');
  }
};

export const rolesDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.role.delete({
      where: { id: Number(id) },
    });
    res.redirect('/roles');
  } catch (error) {
    res.status(400).send('Error deleting role');
  }
};
