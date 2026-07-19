# Caderneta de Gastos

Aplicativo web simples para registrar e organizar gastos do dia a dia, com
visual de **caderneta de anotações** (papel pautado). Uso principal no
**celular**, funciona também no computador.

## Funcionalidades

- Registrar um gasto informando **nome** e **valor em R$** (ex.: `coca cola` / `7,30`)
- **Data atual** adicionada automaticamente no registro
- Cabeçalho com colunas: **Gastos | Dia | Valor R$**
- **Quantidade** de registros e **total** gasto atualizados em tempo real
- **CRUD** completo: criar, listar, editar e excluir (com confirmação)
- Dados salvos no navegador (`localStorage`) — não se perdem ao fechar
- Layout responsivo (mobile-first)

## Como rodar

Não precisa de instalação. Basta abrir o arquivo `index.html` no navegador:

- **Simples:** dê duplo clique em `index.html`
- **No VSCode:** use a extensão **Live Server** → botão direito em
  `index.html` → *Open with Live Server*

## Estrutura do projeto

```
CONTROL_FINAC/
├── index.html   # estrutura da página
├── style.css    # visual de caderneta + responsivo
├── app.js       # lógica CRUD + localStorage
├── prd.md       # documento de requisitos (PRD)
└── README.md
```

## Tecnologias

- HTML, CSS e JavaScript puro (sem dependências)
- Armazenamento local via `localStorage`
