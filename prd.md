# PRD — Organizador de Gastos (Caderneta)

> **Status do projeto**
> - **v1 (MVP) — ✅ CONCLUÍDA:** app HTML/CSS/JS puro, CRUD com `localStorage`,
>   publicado no GitHub e no ar via GitHub Pages.
> - **v2 (Profissionalização) — 🔜 EM PLANEJAMENTO:** login (Google + e-mail),
>   banco de dados Supabase, deploy na Vercel, painel de meses estilo *post-it*
>   e transformação em **PWA**. Detalhada nas seções **11 a 17**.

## 1. Visão Geral

Aplicativo web para registrar e organizar despesas do dia a dia de forma
simples e rápida. O visual imita uma **caderneta de anotações** (papel pautado
com linhas horizontais e duas linhas verticais na lateral), passando a
sensação de "anotar no caderno".

O uso principal é no **celular**, mas o app também deve funcionar bem no
computador (design responsivo).

- **Nome provisório:** Organizador de Gastos / Caderneta de Gastos
- **Tipo:** Aplicação Web (responsiva)
- **Plataforma-alvo:** Mobile (principal) + Desktop
- **Idioma / Moeda:** Português (Brasil) / Real (R$)

## 2. Objetivo

Permitir que o usuário anote uma despesa informando **o nome** e **o valor em
R$** (ex.: `coca cola  7,30`), e visualize automaticamente:

- A **data atual** do momento em que registrou.
- A **quantidade total de registros**.
- A **soma total** de tudo que já foi gasto.

Tudo isso seguindo o modelo **CRUD** (Criar, Ler, Atualizar e Excluir), de
forma **simples e funcional**.

## 3. Público-alvo

Qualquer pessoa que queira controlar gastos pessoais de maneira leve, sem
complicação de planilhas ou apps financeiros complexos.

## 4. Funcionalidades (Requisitos Funcionais)

### 4.1 Registro de despesa (Create)
- Campo para digitar o **nome do gasto** (ex.: "coca cola").
- Campo para digitar o **valor em R$** (ex.: 7,30).
- Ao salvar, o app **acrescenta automaticamente a data atual** do input.
- O novo registro aparece como uma nova linha na "caderneta".

### 4.2 Listagem de despesas (Read)
- Uma **linha superior de cabeçalho** com as colunas:

  | Gastos | Dia | Valor R$ |
  |--------|-----|----------|

- Abaixo do cabeçalho, um **resumo** com:
  - **Quantidade de registros** — ex.: `Qntdd.: 1`
  - **Total gasto** — ex.: `Total: R$ 7,30`
- Abaixo do resumo, a **lista de despesas**, cada uma em uma linha do caderno.

### 4.3 Edição de despesa (Update)
- Permitir editar o **nome** e o **valor** de um registro existente.
- (Opcional) permitir ajustar a data.
- O **total** e a **quantidade** são recalculados automaticamente.

### 4.4 Exclusão de despesa (Delete)
- Permitir excluir um registro.
- Pedir uma **confirmação** antes de excluir.
- O **total** e a **quantidade** são recalculados automaticamente.

## 5. Regras de Negócio

- **Valor:** aceitar formato brasileiro com vírgula decimal (`7,30`).
  Exibir sempre com 2 casas decimais e prefixo `R$` (ex.: `R$ 7,30`).
- **Data:** preenchida automaticamente com a data atual no formato
  `DD/MM/AAAA`.
- **Total:** soma de todos os valores registrados, atualizada em tempo real.
- **Quantidade:** contagem de registros, atualizada em tempo real.
- **Validação:** não permitir salvar sem nome ou sem valor; valor deve ser
  numérico e maior que zero.

## 6. Layout e Design (Interface)

Visual inspirado em uma **folha de caderno / caderneta**:

- Fundo claro (cor de papel) com **linhas horizontais azuis** pautadas.
- **Duas linhas verticais** na lateral esquerda (uma vermelha de margem +
  a guia azul), como no caderno de referência (imagem anexa).
- Fonte com aparência de anotação/manuscrita (opcional) ou uma fonte limpa e
  legível.
- Cabeçalho fixo no topo: `Gastos | Dia | Valor R$`.
- Resumo logo abaixo: `Qntdd.: X` e `Total: R$ Y`.
- Cada despesa alinhada às linhas do caderno.

### Exemplo visual (conceito)
```
| Gastos       |   Dia        | Valor R$ |
------------------------------------------
Qntdd.: 1              Total: R$ 7,30
------------------------------------------
coca cola      19/07/2026     R$ 7,30
```

## 7. Requisitos Não Funcionais

- **Responsivo:** adaptar-se a telas de celular e computador (mobile-first).
- **Simples e leve:** carregamento rápido, poucos cliques para registrar.
- **Persistência de dados:** os gastos não podem se perder ao fechar o app.
  - Sugestão inicial (MVP): `localStorage` do navegador.
  - Evolução futura: banco de dados / conta de usuário.
- **Offline (desejável):** funcionar mesmo sem internet no MVP com
  `localStorage`.

## 8. Tecnologias

**v1 (MVP — atual):**
- **Frontend:** HTML + CSS + JavaScript puro.
- **Estilo:** CSS puro para recriar o fundo de caderno.
- **Armazenamento:** `localStorage`.
- **Hospedagem:** GitHub Pages.

**v2 (Profissionalização — planejada):**
- **Autenticação:** Supabase Auth (Google OAuth + e-mail/senha + recuperação
  de senha).
- **Banco de dados:** Supabase (PostgreSQL) com *Row Level Security* por
  usuário.
- **Hospedagem:** Vercel.
- **PWA:** manifest + service worker (instalável e com uso offline).
- **Frontend:** ✅ **Next.js (React)** — decidido. Facilita login, rotas, PWA
  e a integração nativa com a Vercel.
- **Ordem de implementação:** ✅ começar pelo **Supabase** (banco + CRUD na
  nuvem), depois login, depois post-its/PWA/deploy.

> Ver detalhes nas seções 11 a 17.

## 9. Escopo do MVP (v1 — Concluída)

- [x] Registrar gasto (nome + valor) com data automática.
- [x] Listar gastos com cabeçalho `Gastos | Dia | Valor R$`.
- [x] Mostrar quantidade de registros e total.
- [x] Editar um gasto.
- [x] Excluir um gasto (com confirmação).
- [x] Fundo estilo caderneta (linhas horizontais + 2 verticais).
- [x] Layout responsivo (mobile + desktop).
- [x] Salvar dados no `localStorage`.

Fora do escopo da v1 (tratado na v2 — seções 11 a 17):
- Login / contas de usuário.
- Banco de dados em nuvem e sincronização entre aparelhos.
- Painel de meses (post-its).
- PWA instalável.

Fora do escopo de todas as versões atuais (futuro distante):
- Categorias de gastos, filtros avançados e relatórios.
- Gráficos e metas de gasto.
- Exportar para PDF/planilha.

## 10. Fluxo de Uso (Resumo — v1)

1. Usuário abre o app no celular.
2. Digita o nome do gasto e o valor (ex.: `coca cola` / `7,30`).
3. Toca em **Salvar** → o gasto entra na lista com a data de hoje.
4. O app atualiza a **quantidade** e o **total** automaticamente.
5. Usuário pode **editar** ou **excluir** qualquer gasto.

---

# PARTE II — Profissionalização (v2)

Esta parte descreve a evolução do app para uma versão profissional: com
contas de usuário, dados na nuvem, organização por mês e instalação como app
(PWA). Mantém-se todo o visual de caderneta e o CRUD já existentes.

## 11. Objetivos da v2

- Cada usuário tem **sua própria conta** e vê **somente os seus gastos**.
- Os dados ficam salvos na **nuvem** (Supabase), sincronizando entre celular
  e computador (não dependem mais só do aparelho).
- Organização dos gastos **por mês**, com um painel lateral de *post-its*.
- App hospedado na **Vercel** com deploy automático.
- App instalável no celular e utilizável offline (**PWA**).

## 12. Autenticação e Contas de Usuário

Tela de **login** como porta de entrada do app. Só após autenticar o usuário
acessa a caderneta.

### 12.1 Login com Google (OAuth)
- Botão **"Entrar com Google"**.
- Fluxo OAuth gerenciado pelo **Supabase Auth**.
- Primeiro acesso cria a conta automaticamente.

### 12.2 Cadastro por e-mail e senha
- Para quem **não tem conta Google**.
- Tela de **cadastro** com: e-mail, senha e confirmação de senha.
- Confirmação de e-mail (link enviado pelo Supabase) — a definir se
  obrigatório no lançamento.
- Validações: e-mail válido, senha mínima (ex.: 6+ caracteres), senhas iguais.

### 12.3 Login por e-mail e senha
- Tela de **login** com e-mail e senha para quem já se cadastrou.

### 12.4 Recuperação de senha ("Esqueci a senha")
- Link **"Esqueci minha senha"** na tela de login.
- Usuário informa o e-mail → recebe um link de redefinição (Supabase).
- Tela para definir a nova senha.

### 12.5 Sessão e logout
- Manter o usuário logado entre visitas (sessão persistente do Supabase).
- Botão de **sair (logout)**.

### Regras
- Todo gasto pertence a um usuário (`user_id`).
- Um usuário **nunca** vê os gastos de outro (garantido por RLS no banco).

## 13. Banco de Dados (Supabase / PostgreSQL)

Migração do `localStorage` para o **Supabase**.

### 13.1 Tabela `gastos` (proposta)

| Campo        | Tipo          | Descrição                                  |
|--------------|---------------|--------------------------------------------|
| `id`         | uuid (PK)     | Identificador único do gasto               |
| `user_id`    | uuid (FK)     | Dono do gasto (referência ao usuário auth) |
| `nome`       | text          | Nome da despesa (ex.: "coca cola")         |
| `valor`      | numeric(10,2) | Valor em R$ (ex.: 7.30)                     |
| `data`       | date          | Data do gasto (default: data atual)        |
| `created_at` | timestamptz   | Data/hora de criação do registro           |

### 13.2 Segurança
- **Row Level Security (RLS)** habilitada: cada usuário só lê/escreve linhas
  onde `user_id = auth.uid()`.
- Operações CRUD passam a usar o cliente do Supabase (`insert`, `select`,
  `update`, `delete`).

### 13.3 Migração de dados
- (Opcional) na primeira vez logado, oferecer importar os gastos que estavam
  no `localStorage` para a conta na nuvem.

## 14. Organização por Mês — Painel de Post-its

Painel **à esquerda** (no celular pode virar uma faixa no topo ou um menu)
com *post-its* representando os meses, de **Janeiro a Dezembro**.

### Regras
- Um post-it de um mês **só aparece se houver gastos** naquele mês.
- Cada post-it mostra o **mês/ano** e a **soma total** daquele mês.
  - Exemplo: `Jan/2026  R$ 935,66`
- Ao **clicar/tocar** em um post-it, a caderneta mostra **todos os gastos
  daquele mês**, e o resumo (`Qntdd.` e `Total`) passa a ser **do mês
  selecionado**.
- Visual de post-it (papel colorido, leve inclinação/sombra), combinando com
  o tema de caderneta.
- Meses com anos diferentes são distinguidos (ex.: `Jan/2026`, `Jan/2027`).

### Exemplo visual (conceito)
```
┌─────────────┐     | Gastos       |   Dia      | Valor R$ |
│  Jan/2026   │     ---------------------------------------
│  R$ 935,66  │     Qntdd.: 12          Total: R$ 935,66
└─────────────┘     ---------------------------------------
┌─────────────┐     coca cola      03/01/2026    R$ 7,30
│  Fev/2026   │     mercado        05/01/2026    R$ 210,00
│  R$ 512,10  │     ...
└─────────────┘
```

## 15. PWA (Progressive Web App)

Transformar o app em **PWA**, para instalação e uso como aplicativo.

- **`manifest.json`:** nome, ícones (vários tamanhos), cor de tema, modo
  `standalone`, orientação.
- **Service worker:** cache dos arquivos estáticos para carregar rápido e
  funcionar offline (a leitura/gravação de gastos online exige conexão; o
  app deve degradar de forma elegante quando offline).
- **Instalável:** opção "Adicionar à tela inicial" no celular, com ícone
  próprio.
- **Ícones:** criar ícone do app (tema caderneta) nos tamanhos exigidos
  (ex.: 192x192 e 512x512).

## 16. Deploy (Vercel)

- Hospedar o app na **Vercel**, conectada ao repositório do GitHub.
- **Deploy automático** a cada `push` na branch principal.
- Configurar as **variáveis de ambiente** do Supabase (URL do projeto e chave
  pública `anon`) no painel da Vercel.
- Ajustar as **URLs de redirecionamento** do OAuth/Supabase para o domínio da
  Vercel.
- (Futuro) domínio personalizado.

## 17. Escopo da v2 (Checklist)

Autenticação:
- [ ] Tela de login.
- [ ] Login com Google (OAuth via Supabase).
- [ ] Cadastro por e-mail e senha.
- [ ] Login por e-mail e senha.
- [ ] Recuperação de senha ("esqueci a senha").
- [ ] Logout e sessão persistente.

Banco de dados:
- [ ] Projeto Supabase criado.
- [ ] Tabela `gastos` com RLS por usuário.
- [ ] CRUD migrado do `localStorage` para o Supabase.
- [ ] (Opcional) importar dados antigos do `localStorage`.

Meses / Post-its:
- [ ] Painel lateral de post-its (Jan–Dez).
- [ ] Post-it aparece só se houver gastos no mês.
- [ ] Post-it mostra mês/ano + total (ex.: `Jan/2026 R$ 935,66`).
- [ ] Clicar no mês filtra a caderneta e o resumo para aquele mês.

PWA e Deploy:
- [ ] `manifest.json` + ícones.
- [ ] Service worker (cache/offline).
- [ ] Instalável no celular.
- [ ] Deploy na Vercel com deploy automático.
- [ ] Variáveis de ambiente e URLs de redirecionamento configuradas.

## 18. Decisões e Pontos a Definir

**Decididos:**
- ✅ **Framework:** Next.js (React).
- ✅ **Ordem:** Supabase primeiro (banco + CRUD na nuvem).

**Ainda a definir:**
- **Confirmação de e-mail** obrigatória no cadastro?
- **Migração** dos gastos do `localStorage` para a conta: incluir no
  lançamento ou deixar para depois?
- Comportamento **offline** desejado para os gastos (somente leitura em cache,
  ou fila de gravação para sincronizar depois?).
