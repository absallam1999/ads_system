import { Router } from 'express';
import { login, forgotPassword } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import {
  loginSchema,
  forgotPasswordSchema,
} from '../validators/auth.validators';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);

export default router;
