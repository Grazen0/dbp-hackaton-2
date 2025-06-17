import { z } from 'zod/v4';
import { RoleSchema } from './role';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  role: RoleSchema,
  createdAt: z.coerce.date(),
});

export type UserSchema = z.infer<typeof UserSchema>;
