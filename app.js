// ===== Caderneta de Gastos — lógica CRUD com localStorage =====

const CHAVE_STORAGE = "caderneta-gastos";

// Elementos da tela
const form = document.getElementById("form-gasto");
const inputNome = document.getElementById("input-nome");
const inputValor = document.getElementById("input-valor");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const listaEl = document.getElementById("lista-gastos");
const qntddEl = document.getElementById("qntdd");
const totalEl = document.getElementById("total");
const vazioEl = document.getElementById("vazio");

// Estado
let gastos = carregar();
let idEditando = null; // null = criando; caso contrário = editando

// ===== Utilidades =====

// Converte "7,30" ou "7.30" em número 7.3
function parseValor(texto) {
  const limpo = String(texto).trim().replace(/\./g, "").replace(",", ".");
  const n = parseFloat(limpo);
  return isNaN(n) ? NaN : n;
}

// Formata número como "R$ 7,30"
function formatarBRL(n) {
  return "R$ " + n.toFixed(2).replace(".", ",");
}

// Data atual no formato DD/MM/AAAA
function dataHoje() {
  return new Date().toLocaleDateString("pt-BR");
}

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ===== Persistência =====

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

function salvar() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(gastos));
}

// ===== Renderização =====

function render() {
  listaEl.innerHTML = "";

  gastos.forEach((g) => {
    const li = document.createElement("li");
    li.className = "item-gasto";
    li.innerHTML = `
      <span class="item-nome" title="${escaparHtml(g.nome)}">${escaparHtml(g.nome)}</span>
      <span class="item-dia">${g.dia}</span>
      <span class="item-valor">${formatarBRL(g.valor)}</span>
      <span class="item-acoes">
        <button class="btn-acao" data-acao="editar" data-id="${g.id}" title="Editar" aria-label="Editar">✏️</button>
        <button class="btn-acao" data-acao="excluir" data-id="${g.id}" title="Excluir" aria-label="Excluir">🗑️</button>
      </span>
    `;
    listaEl.appendChild(li);
  });

  // Resumo
  const total = gastos.reduce((soma, g) => soma + g.valor, 0);
  qntddEl.textContent = `Qntdd.: ${gastos.length}`;
  totalEl.textContent = `Total: ${formatarBRL(total)}`;

  // Estado vazio
  vazioEl.classList.toggle("oculto", gastos.length > 0);
}

// Evita injeção de HTML no nome
function escaparHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ===== CRUD =====

// Create / Update
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = inputNome.value.trim();
  const valor = parseValor(inputValor.value);

  if (!nome) {
    alert("Digite o nome do gasto.");
    inputNome.focus();
    return;
  }
  if (isNaN(valor) || valor <= 0) {
    alert("Digite um valor válido maior que zero. Ex.: 7,30");
    inputValor.focus();
    return;
  }

  if (idEditando) {
    // Update
    const g = gastos.find((x) => x.id === idEditando);
    if (g) {
      g.nome = nome;
      g.valor = valor;
    }
    sairModoEdicao();
  } else {
    // Create
    gastos.push({
      id: gerarId(),
      nome,
      valor,
      dia: dataHoje(),
    });
  }

  salvar();
  render();
  form.reset();
  inputNome.focus();
});

// Ações da lista (editar / excluir) via delegação de eventos
listaEl.addEventListener("click", (e) => {
  const botao = e.target.closest("[data-acao]");
  if (!botao) return;

  const id = botao.dataset.id;
  const acao = botao.dataset.acao;

  if (acao === "excluir") {
    excluir(id);
  } else if (acao === "editar") {
    entrarModoEdicao(id);
  }
});

// Delete
function excluir(id) {
  const g = gastos.find((x) => x.id === id);
  if (!g) return;

  if (confirm(`Excluir o gasto "${g.nome}" (${formatarBRL(g.valor)})?`)) {
    gastos = gastos.filter((x) => x.id !== id);
    if (idEditando === id) sairModoEdicao();
    salvar();
    render();
  }
}

// ===== Modo edição =====

function entrarModoEdicao(id) {
  const g = gastos.find((x) => x.id === id);
  if (!g) return;

  idEditando = id;
  inputNome.value = g.nome;
  inputValor.value = g.valor.toFixed(2).replace(".", ",");
  btnSalvar.textContent = "Atualizar";
  btnCancelar.classList.remove("oculto");
  inputNome.focus();
}

function sairModoEdicao() {
  idEditando = null;
  btnSalvar.textContent = "Salvar";
  btnCancelar.classList.add("oculto");
  form.reset();
}

btnCancelar.addEventListener("click", sairModoEdicao);

// ===== Início =====
render();
