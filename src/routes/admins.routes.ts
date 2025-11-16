import { Router } from 'express';
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/admins.controller';

import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';

import {
  createAdminSchema,
  updateAdminSchema,
} from '../validators/admin.validator';

const router = Router();

router.use(authenticate);

router.get('/', getAllAdmins);
router.get('/:id', getAdminById);

router.post('/', validate(createAdminSchema), createAdmin);

router.put('/:id', validate(updateAdminSchema), updateAdmin);

router.delete('/:id', deleteAdmin);

export default router;
