import { supabase } from './supabase';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

type FetchOptions = RequestInit & {
  /**
   * Se `true`, injeta o JWT do Supabase no header Authorization.
   * Padrão: `true`. Use `false` em rotas explicitamente públicas
   * (como POST /leads).
   */
  authenticated?: boolean;
};

async function getToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export async function api<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { authenticated = true, headers, ...rest } = options;

  const token = authenticated ? await getToken() : null;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
