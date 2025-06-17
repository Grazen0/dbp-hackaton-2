import { z } from 'zod/v4';

export const ExpenseSchema = z.object({
  id: z.number(),
  date: z.coerce.date(),
  amount: z.number(),
});

export type ExpenseSchema = z.infer<typeof ExpenseSchema>;
