import { z } from 'zod/v4';

export const UserSchema = z.object({
  email: z.string(),
});

export type UserSchema = z.infer<typeof UserSchema>;
