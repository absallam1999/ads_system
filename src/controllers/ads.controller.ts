import { Request, Response, NextFunction } from 'express';
import { AdsService } from '../services/ads.service';
import { Ad } from '../models/ad.model';
import multer from 'multer';

const adsService = new AdsService();
const upload = multer({ storage: multer.memoryStorage() });

export const getAllAds = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ads = await adsService.getAll();
    res.json(ads);
  } catch (err) {
    next(err);
  }
};

export const getAdById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ad = await adsService.getById(id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.json(ad);
  } catch (err) {
    next(err);
  }
};

export const createAd = [
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, link, template } = req.body;
      const image = req.file ? req.file.buffer : null;
      if (!image) {
        return res.status(400).json({ message: 'Image is required' });
      }
      const ad = await adsService.create({
        image,
        title,
        description,
        link,
        template,
      });
      res.status(201).json(ad);
    } catch (err) {
      next(err);
    }
  },
];

export const updateAd = [
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { title, description, link } = req.body;
      const image = req.file ? req.file.buffer : undefined;
      const updateData: Partial<Ad> = { title, description, link, image };
      const updated = await adsService.update(id, updateData);
      if (!updated) {
        return res.status(404).json({ message: 'Ad not found' });
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },
];

export const deleteAd = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    await adsService.delete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
