import { z } from 'zod/v4';

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CategorySchema = z.infer<typeof CategorySchema>;
