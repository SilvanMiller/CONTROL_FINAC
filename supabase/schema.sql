-- ============================================================
-- Caderneta de Gastos — Esquema do banco (Supabase / PostgreSQL)
-- Rode este script no Supabase: painel do projeto > SQL Editor > New query
-- ============================================================

-- Tabela de gastos
create table if not exists public.gastos (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  nome       text not null check (char_length(nome) between 1 and 60),
  valor      numeric(10, 2) not null check (valor > 0),
  data       date not null default current_date,
  created_at timestamptz not null default now()
);

-- Índice para consultar rápido os gastos de um usuário por data
create index if not exists gastos_user_data_idx
  on public.gastos (user_id, data);

-- ============================================================
-- Row Level Security (RLS): cada usuário só acessa os próprios gastos
-- ============================================================
alter table public.gastos enable row level security;

-- Ler apenas os próprios gastos
create policy "gastos_select_proprios"
  on public.gastos for select
  using (auth.uid() = user_id);

-- Inserir gastos apenas para si mesmo
create policy "gastos_insert_proprios"
  on public.gastos for insert
  with check (auth.uid() = user_id);

-- Atualizar apenas os próprios gastos
create policy "gastos_update_proprios"
  on public.gastos for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Excluir apenas os próprios gastos
create policy "gastos_delete_proprios"
  on public.gastos for delete
  using (auth.uid() = user_id);
