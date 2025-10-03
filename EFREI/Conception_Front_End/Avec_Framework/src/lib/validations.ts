import { z } from 'zod';

export const todoFormSchema = z.object({
  title: z.string().min(5, 'Le titre doit contenir au moins 5 caractères').max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  completed: z.boolean(),
});

export type TodoFormData = z.infer<typeof todoFormSchema>;
