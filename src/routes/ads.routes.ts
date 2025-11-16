import { Router } from 'express';
import {
  getAllAds,
  getAdById,
  createAd,
  updateAd,
  deleteAd,
} from '../controllers/ads.controller';

import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

import { createAdSchema, updateAdSchema } from '../validators/ad.validator';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getAllAds);
router.get('/:id', getAdById);

router.post('/', upload.single('image'), validate(createAdSchema), createAd);

router.put('/:id', upload.single('image'), validate(updateAdSchema), updateAd);

router.delete('/:id', deleteAd);

export default router;
