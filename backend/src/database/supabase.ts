import { createClient } from '@supabase/supabase-js';
import { env } from '../env.js';

/**
 * Cliente Supabase com permissão total (service role).
 * Uso EXCLUSIVO no backend. Nunca exponha a service role key no frontend.
 */
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
