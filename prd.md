# PRD — Organizador de Gastos (Caderneta)

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

## 8. Sugestão de Tecnologias (a definir)

Opção enxuta para começar rápido no VSCode:

- **Frontend:** HTML + CSS + JavaScript puro (ou React/Vite).
- **Estilo:** CSS puro para recriar o fundo de caderno.
- **Armazenamento (MVP):** `localStorage`.

> Estas escolhas são sugestões; podem ser ajustadas conforme a preferência.

## 9. Escopo do MVP (Primeira Versão)

Incluído:
- [ ] Registrar gasto (nome + valor) com data automática.
- [ ] Listar gastos com cabeçalho `Gastos | Dia | Valor R$`.
- [ ] Mostrar quantidade de registros e total.
- [ ] Editar um gasto.
- [ ] Excluir um gasto (com confirmação).
- [ ] Fundo estilo caderneta (linhas horizontais + 2 verticais).
- [ ] Layout responsivo (mobile + desktop).
- [ ] Salvar dados no `localStorage`.

Fora do escopo (versões futuras):
- Login / contas de usuário.
- Categorias de gastos, filtros e relatórios.
- Gráficos e metas de gasto.
- Exportar para PDF/planilha.
- Sincronização em nuvem.

## 10. Fluxo de Uso (Resumo)

1. Usuário abre o app no celular.
2. Digita o nome do gasto e o valor (ex.: `coca cola` / `7,30`).
3. Toca em **Salvar** → o gasto entra na lista com a data de hoje.
4. O app atualiza a **quantidade** e o **total** automaticamente.
5. Usuário pode **editar** ou **excluir** qualquer gasto.
