import { Request, Response, NextFunction } from 'express';
import { AdminsService } from '../services/admins.service';

const adminsService = new AdminsService();

export const getAllAdmins = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admins = await adminsService.getAll();
    res.json(admins);
  } catch (err) {
    next(err);
  }
};

export const getAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const admin = await adminsService.getById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (err) {
    next(err);
  }
};

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = await adminsService.create(req.body);
    res.status(201).json(admin);
  } catch (err) {
    next(err);
  }
};

export const updateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updated = await adminsService.update(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    await adminsService.delete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
