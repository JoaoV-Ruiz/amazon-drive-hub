# Migrations

SQL idempotente que define o schema do banco no Supabase.

## Como aplicar

1. Abra o Supabase Dashboard → **SQL Editor**.
2. Cole o conteúdo do arquivo `0001_initial_schema.sql`.
3. Clique em **Run**.
4. Confira em **Table Editor** que as tabelas foram criadas.

> Os scripts usam `if not exists`, então rodar de novo é seguro.

## Como criar o primeiro admin

Depois de aplicar a migration:

1. **Authentication → Users → Add user** → crie email/senha do admin.
2. **SQL Editor**:

   ```sql
   insert into profiles (id, name, role)
   select id, 'Seu Nome', 'admin'
   from auth.users
   where email = 'seu-email@exemplo.com';
   ```

3. Pronto. Esse usuário pode fazer login no painel `/admin`.

## Como criar um parceiro

1. **Authentication → Users → Add user** → email/senha do parceiro.
2. **SQL Editor**:

   ```sql
   -- Primeiro a empresa parceira:
   insert into partners (name, email, phone)
   values ('Loja X', 'contato@lojax.com', '+5592...')
   returning id;
   -- pegue o id retornado e use abaixo:

   insert into profiles (id, name, role, partner_id)
   select u.id, 'Nome do contato', 'partner', '<partner_id_acima>'
   from auth.users u
   where u.email = 'parceiro@exemplo.com';
   ```

## Storage buckets (manual)

Crie no dashboard (**Storage → New bucket**):

| Bucket             | Público? | Uso                                       |
| ------------------ | -------- | ----------------------------------------- |
| `car-images`       | Sim      | Fotos exibidas no anúncio                 |
| `maintenance-pdfs` | **Não**  | PDFs de manutenção; download via URL assinada gerada pelo backend |

## Próximas migrations

Use o padrão `NNNN_descricao_curta.sql` em ordem crescente:

- `0002_add_xxx_to_yyy.sql`
- `0003_create_zzz.sql`
