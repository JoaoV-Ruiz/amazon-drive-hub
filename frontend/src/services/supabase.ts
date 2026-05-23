import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    'Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY são obrigatórias. ' +
      'Copie frontend/.env.example para frontend/.env e preencha.',
  );
}

/**
 * Cliente Supabase para uso no navegador.
 *
 * Use APENAS para:
 *  - Login (auth.signInWithPassword)
 *  - Logout (auth.signOut)
 *  - Recuperar sessão / token atual
 *  - Leituras protegidas por RLS (se necessário)
 *
 * Para tudo que envolve papel (esconder placa do cliente, listar leads,
 * etc.) fale com o backend Fastify usando o helper em `api.ts`.
 */
export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
