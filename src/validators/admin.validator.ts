import { z } from 'zod';
import { AdminRole } from '../models/admin.model';

const adminRoleValues = Object.values(AdminRole) as string[];
const adminRoleLiterals = adminRoleValues as [string, ...string[]];

const email = z
  .string()
  .email('Invalid email address')
  .max(255, 'Email too long');

const password = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password too long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain lowercase, uppercase and a digit'
  );

const role = z
  .enum(adminRoleLiterals)
  .refine((v) => adminRoleValues.includes(v), {
    message: 'Invalid role',
  });

export const createAdminSchema = z.object({
  email,
  password,
  role,
});

export const updateAdminSchema = z.object({
  email: email.optional(),
  role: role.optional(),
  password: password.optional(),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email,
});

export type CreateAdminDto = z.infer<typeof createAdminSchema>;
export type UpdateAdminDto = z.infer<typeof updateAdminSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
