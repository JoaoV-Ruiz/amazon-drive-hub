-- ============================================================
-- AmazonRepasse — schema inicial (MVP)
-- ------------------------------------------------------------
-- Como aplicar:
--   Supabase Dashboard → SQL Editor → cole tudo → Run.
--
-- Convenções (do SDD):
--   • Todas as PKs são uuid (gen_random_uuid()).
--   • Toda tabela tem created_at / updated_at / deleted_at.
--   • Soft delete: nunca DELETE; UPDATE ... SET deleted_at = NOW() (RN003).
--   • RLS habilitada em todas as tabelas (deny by default).
--     O backend usa service_role e bypassa RLS.
--     O frontend só lê via backend; não fala direto com as tabelas.
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
-- Helper: trigger pra manter updated_at sempre fresco
-- ============================================================
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- PARTNERS — empresas/pessoas conveniadas
-- ============================================================
create table if not exists partners (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index if not exists partners_deleted_at_idx on partners (deleted_at);
create trigger partners_set_updated_at before update on partners
  for each row execute function set_updated_at();

-- ============================================================
-- PROFILES — extensão de auth.users
-- ============================================================
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text not null,
  role        text not null check (role in ('admin', 'partner')),
  partner_id  uuid references partners(id),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz,

  -- Garante: admin não tem partner_id; partner sempre tem.
  constraint profiles_role_partner_check check (
    (role = 'admin'   and partner_id is null) or
    (role = 'partner' and partner_id is not null)
  )
);

create index if not exists profiles_role_idx       on profiles (role);
create index if not exists profiles_partner_id_idx on profiles (partner_id);
create index if not exists profiles_deleted_at_idx on profiles (deleted_at);
create trigger profiles_set_updated_at before update on profiles
  for each row execute function set_updated_at();

-- ============================================================
-- CARS — estoque de veículos
-- ============================================================
create table if not exists cars (
  id               uuid primary key default gen_random_uuid(),
  brand            text not null,
  model            text not null,
  plate            text not null,                                       -- RN004 (obrigatória)
  year             int  not null check (year between 1900 and 2100),
  price            numeric(12, 2) not null check (price >= 0),
  km               int  not null check (km >= 0),
  fuel             text not null,
  description      text not null default '',
  status           text not null default 'DISPONIVEL'
                     check (status in ('DISPONIVEL', 'VENDIDO')),       -- RN002
  partner_id       uuid references partners(id),                        -- não-nulo = consignado
  maintenance_pdf  text,                                                -- URL no Supabase Storage
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  deleted_at       timestamptz
);

create index if not exists cars_status_idx     on cars (status);
create index if not exists cars_partner_id_idx on cars (partner_id);
create index if not exists cars_deleted_at_idx on cars (deleted_at);
-- Placa única só entre carros ativos (não-deletados).
create unique index if not exists cars_plate_unique_active
  on cars (plate) where deleted_at is null;

create trigger cars_set_updated_at before update on cars
  for each row execute function set_updated_at();

-- ============================================================
-- CAR_IMAGES — galeria de fotos do carro
-- ============================================================
create table if not exists car_images (
  id          uuid primary key default gen_random_uuid(),
  car_id      uuid not null references cars(id) on delete cascade,
  url         text not null,
  created_at  timestamptz not null default now()
);

create index if not exists car_images_car_id_idx on car_images (car_id);

-- ============================================================
-- LEADS — interesses de clientes
-- ============================================================
create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  car_id      uuid not null references cars(id),
  name        text not null,
  phone       text not null,
  message     text not null default '',
  status      text not null default 'NOVO'                              -- RN001
                check (status in ('NOVO', 'EM_CONTATO', 'FECHADO', 'PERDIDO')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index if not exists leads_car_id_idx     on leads (car_id);
create index if not exists leads_status_idx     on leads (status);
create index if not exists leads_deleted_at_idx on leads (deleted_at);
create trigger leads_set_updated_at before update on leads
  for each row execute function set_updated_at();

-- ============================================================
-- CONSIGNMENTS — histórico de consignações
-- ============================================================
create table if not exists consignments (
  id          uuid primary key default gen_random_uuid(),
  car_id      uuid not null references cars(id),
  partner_id  uuid not null references partners(id),
  status      text not null default 'ATIVA'
                check (status in ('ATIVA', 'ENCERRADA')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists consignments_car_id_idx     on consignments (car_id);
create index if not exists consignments_partner_id_idx on consignments (partner_id);
create index if not exists consignments_status_idx     on consignments (status);
create trigger consignments_set_updated_at before update on consignments
  for each row execute function set_updated_at();

-- ============================================================
-- RLS — deny by default em todas as tabelas
-- ------------------------------------------------------------
-- O backend Fastify usa service_role, que IGNORA RLS.
-- A anon key (frontend) NÃO tem nenhuma policy = acesso negado
-- a essas tabelas. Isso é proposital: o frontend só fala com o
-- backend pra coisas de domínio. A anon key serve só pro fluxo
-- de auth (auth.signInWithPassword, getSession, signOut).
-- ============================================================
alter table partners       enable row level security;
alter table profiles       enable row level security;
alter table cars           enable row level security;
alter table car_images     enable row level security;
alter table leads          enable row level security;
alter table consignments   enable row level security;

-- ============================================================
-- STORAGE buckets sugeridos (criar manualmente no dashboard):
--   • car-images        → público (URLs das fotos do anúncio)
--   • maintenance-pdfs  → PRIVADO (download via URL assinada
--                          gerada pelo backend para admin/parceiro)
-- ============================================================
