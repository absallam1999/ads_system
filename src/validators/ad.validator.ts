import { z } from 'zod';
import { AdTemplate } from '../models/ad.model';

const adTemplateValues = Object.values(AdTemplate) as string[];
const adTemplateLiterals = adTemplateValues as [string, ...string[]];

const title = z
  .string()
  .min(1, 'Title is required')
  .max(255, 'Title too long')
  .trim();

const description = z
  .string()
  .optional()
  .transform((v) => (v ? v : null));

const link = z
  .string()
  .url('Invalid URL')
  .optional()
  .transform((v) => (v ? v : null));

const template = z
  .enum(adTemplateLiterals)
  .refine((v) => adTemplateValues.includes(v), {
    message: 'Invalid template',
  });

export const createAdSchema = z.object({
  title,
  description,
  link,
  template,
});

export const updateAdSchema = z.object({
  title: title.optional(),
  description: description.optional(),
  link: link.optional(),
  template: template.optional(),
});

export type CreateAdDto = z.infer<typeof createAdSchema>;
export type UpdateAdDto = z.infer<typeof updateAdSchema>;
