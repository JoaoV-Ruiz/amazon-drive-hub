# Módulo: auth

A autenticação é feita pelo **Supabase Auth**. O backend **não** emite
JWT próprio — apenas valida o token emitido pelo Supabase.

## Fluxo

```
1. Frontend chama supabase.auth.signInWithPassword({ email, password })
2. Supabase devolve um access_token (JWT)
3. Frontend manda o token em Authorization: Bearer <token>
4. Backend valida com supabase.auth.getUser(token)
5. Backend lê a tabela `profiles` para descobrir role e partner_id
6. req.user fica disponível nos handlers
```

## Onde está o código

- `src/middlewares/auth.ts` — `authenticate` e `requireRole`
- `src/database/supabase.ts` — cliente service_role

## Onde NÃO tem código

Como o Supabase Auth resolve login, hash de senha, recuperação e
sessão, **este módulo não tem endpoints próprios para login/logout** no
MVP. Ele existe basicamente para hospedar utilitários relacionados a
auth e (futuramente) endpoints administrativos como "criar parceiro
com convite por email", se necessário.

Endpoints possíveis no futuro:

- `POST /admin/users/invite` — admin cria um parceiro novo (envia
  convite via Supabase Auth Admin API).
- `POST /admin/users/:id/disable` — desativa um perfil (soft delete em
  `profiles`).

## Criando o primeiro admin

Como não há tela pública de cadastro:

1. Crie o usuário no Supabase Dashboard (Authentication → Users → Add user).
2. Insira a linha correspondente em `profiles` com `role = 'admin'`
   (manual via SQL editor enquanto não houver UI).

Veja [docs/02-papeis-e-permissoes.md](../../../../docs/02-papeis-e-permissoes.md).
