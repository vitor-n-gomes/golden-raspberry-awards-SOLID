import * as z from 'zod';

export const envSchema = z
  .object({
    HOST: z.string(),
    NODE_ENV: z.string(),
    PORT: z.string(),
  })
  .nonstrict();

export type Env = z.infer<typeof envSchema>;
