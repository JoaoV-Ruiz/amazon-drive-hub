import type { FastifyReply, FastifyRequest, preHandlerHookHandler } from 'fastify';
import { supabase } from '../database/supabase.js';

export type AuthRole = 'admin' | 'partner';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: AuthRole;
  partnerId: string | null;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthenticatedUser;
  }
}

/**
 * Valida o JWT do Supabase enviado no header `Authorization: Bearer <token>`.
 * Em caso de sucesso, popula `req.user` com id, email, role e partnerId.
 *
 * O token é emitido pelo frontend ao chamar `supabase.auth.signInWithPassword`.
 * A validação acontece chamando `supabase.auth.getUser(token)` usando o
 * cliente com service_role.
 */
export async function authenticate(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.code(401).send({ error: 'Authorization header ausente ou inválido' });
  }

  const token = authHeader.slice('Bearer '.length).trim();

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return reply.code(401).send({ error: 'Token inválido ou expirado' });
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, partner_id')
    .eq('id', data.user.id)
    .is('deleted_at', null)
    .single();

  if (profileError || !profile) {
    return reply.code(403).send({ error: 'Perfil não encontrado ou desativado' });
  }

  req.user = {
    id: data.user.id,
    email: data.user.email ?? '',
    role: profile.role as AuthRole,
    partnerId: (profile.partner_id as string | null) ?? null,
  };
}

/**
 * Restringe a rota aos papéis informados.
 * Deve rodar DEPOIS de `authenticate`.
 *
 * Uso:
 *   app.get('/admin/cars', { preHandler: [authenticate, requireRole('admin')] }, ...)
 */
export function requireRole(...roles: AuthRole[]): preHandlerHookHandler {
  return async (req, reply) => {
    if (!req.user) {
      return reply.code(401).send({ error: 'Não autenticado' });
    }
    if (!roles.includes(req.user.role)) {
      return reply.code(403).send({ error: 'Acesso negado' });
    }
  };
}
