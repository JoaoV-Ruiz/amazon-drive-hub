import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  HOST: z.string().default('0.0.0.0'),

  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SUPABASE_ANON_KEY: z.string().min(1),

  FIPE_API_URL: z.string().url().default('https://parallelum.com.br/fipe/api/v1'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Variáveis de ambiente inválidas:', parsed.error.flatten().fieldErrors);
  throw new Error('Falha ao carregar variáveis de ambiente. Verifique seu .env');
}

export const env = parsed.data;
