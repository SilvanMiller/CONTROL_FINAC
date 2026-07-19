"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const MESES = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

// "7,30" ou "7.30" -> 7.3
function parseValor(texto) {
  const limpo = String(texto).trim().replace(/\./g, "").replace(",", ".");
  const n = parseFloat(limpo);
  return isNaN(n) ? NaN : n;
}

// 7.3 -> "R$ 7,30"
function formatarBRL(n) {
  return "R$ " + Number(n).toFixed(2).replace(".", ",");
}

// "2026-01-03" -> "03/01/2026"
function formatarData(iso) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

// "2026-01" -> "Jan/2026"
function rotuloMes(chave) {
  const [ano, mes] = chave.split("-");
  return `${MESES[Number(mes) - 1]}/${ano}`;
}

function mesMaisRecente(gastos) {
  let max = null;
  for (const g of gastos) {
    const m = g.data.slice(0, 7);
    if (!max || m > max) max = m;
  }
  return max;
}

export default function Caderneta({ initialGastos, userId, userEmail }) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [gastos, setGastos] = useState(initialGastos);
  const [mesSelecionado, setMesSelecionado] = useState(() =>
    mesMaisRecente(initialGastos)
  );
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [idEditando, setIdEditando] = useState(null);
  const [erro, setErro] = useState("");
  const [ocupado, setOcupado] = useState(false);

  // Meses com gastos (para os post-its), do mais recente ao mais antigo
  const meses = useMemo(() => {
    const map = new Map();
    for (const g of gastos) {
      const chave = g.data.slice(0, 7);
      map.set(chave, (map.get(chave) ?? 0) + Number(g.valor));
    }
    return [...map.entries()]
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([chave, total]) => ({ chave, total }));
  }, [gastos]);

  // Gastos do mes selecionado (ou todos, se nenhum mes selecionado)
  const gastosFiltrados = useMemo(() => {
    const lista = mesSelecionado
      ? gastos.filter((g) => g.data.slice(0, 7) === mesSelecionado)
      : gastos;
    return [...lista].sort(
      (a, b) =>
        b.data.localeCompare(a.data) ||
        String(b.created_at).localeCompare(String(a.created_at))
    );
  }, [gastos, mesSelecionado]);

  const total = gastosFiltrados.reduce((s, g) => s + Number(g.valor), 0);

  async function recarregar() {
    const { data } = await supabase
      .from("gastos")
      .select("*")
      .order("data", { ascending: false })
      .order("created_at", { ascending: false });
    setGastos(data ?? []);
    return data ?? [];
  }

  async function salvar(e) {
    e.preventDefault();
    setErro("");

    const nomeLimpo = nome.trim();
    const valorNum = parseValor(valor);
    if (!nomeLimpo) {
      setErro("Digite o nome do gasto.");
      return;
    }
    if (isNaN(valorNum) || valorNum <= 0) {
      setErro("Digite um valor valido maior que zero. Ex.: 7,30");
      return;
    }

    setOcupado(true);
    try {
      if (idEditando) {
        const { error } = await supabase
          .from("gastos")
          .update({ nome: nomeLimpo, valor: valorNum })
          .eq("id", idEditando);
        if (error) throw error;
        setIdEditando(null);
      } else {
        const { error } = await supabase
          .from("gastos")
          .insert({ nome: nomeLimpo, valor: valorNum, user_id: userId });
        if (error) throw error;
      }
      setNome("");
      setValor("");
      const atualizados = await recarregar();
      // Passa a mostrar o mes do gasto recem-adicionado
      const recente = mesMaisRecente(atualizados);
      if (!idEditando && recente) setMesSelecionado(recente);
    } catch {
      setErro("Nao foi possivel salvar o gasto.");
    } finally {
      setOcupado(false);
    }
  }

  function editar(g) {
    setIdEditando(g.id);
    setNome(g.nome);
    setValor(Number(g.valor).toFixed(2).replace(".", ","));
    setErro("");
  }

  function cancelarEdicao() {
    setIdEditando(null);
    setNome("");
    setValor("");
    setErro("");
  }

  async function excluir(g) {
    if (!confirm(`Excluir "${g.nome}" (${formatarBRL(g.valor)})?`)) return;
    setOcupado(true);
    try {
      const { error } = await supabase.from("gastos").delete().eq("id", g.id);
      if (error) throw error;
      if (idEditando === g.id) cancelarEdicao();
      const atualizados = await recarregar();
      // Se o mes atual ficou sem gastos, volta para o mais recente
      const aindaTem = atualizados.some(
        (x) => x.data.slice(0, 7) === mesSelecionado
      );
      if (!aindaTem) setMesSelecionado(mesMaisRecente(atualizados));
    } catch {
      setErro("Nao foi possivel excluir o gasto.");
    } finally {
      setOcupado(false);
    }
  }

  async function sair() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="app-wrap">
      {/* Post-its dos meses */}
      <aside className="painel-meses">
        {meses.map((m) => (
          <button
            key={m.chave}
            className={`postit ${m.chave === mesSelecionado ? "ativo" : ""}`}
            onClick={() => setMesSelecionado(m.chave)}
          >
            <div className="postit-mes">{rotuloMes(m.chave)}</div>
            <div className="postit-total">{formatarBRL(m.total)}</div>
          </button>
        ))}
      </aside>

      {/* Folha da caderneta */}
      <main className="caderneta" style={{ flex: "1 1 auto" }}>
        <div className="topo">
          <span title={userEmail}>{userEmail}</span>
          <button className="btn-sair" onClick={sair}>
            Sair
          </button>
        </div>

        <h1 className="titulo">
          {mesSelecionado ? rotuloMes(mesSelecionado) : "Caderneta de Gastos"}
        </h1>

        <form className="form-gasto" onSubmit={salvar} autoComplete="off">
          <input
            type="text"
            className="campo campo-nome"
            placeholder="Ex.: coca cola"
            maxLength={60}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            className="campo campo-valor"
            placeholder="0,00"
            inputMode="decimal"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <button type="submit" className="btn" disabled={ocupado}>
            {idEditando ? "Atualizar" : "Salvar"}
          </button>
          {idEditando && (
            <button
              type="button"
              className="btn btn-secundario"
              onClick={cancelarEdicao}
            >
              Cancelar
            </button>
          )}
        </form>

        {erro && <p className="msg-erro">{erro}</p>}

        <div className="cabecalho">
          <span>Gastos</span>
          <span className="dir">Dia</span>
          <span className="dir">Valor R$</span>
        </div>

        <div className="resumo">
          <span>Qntdd.: {gastosFiltrados.length}</span>
          <span>Total: {formatarBRL(total)}</span>
        </div>

        <ul className="lista-gastos">
          {gastosFiltrados.map((g) => (
            <li key={g.id} className="item-gasto">
              <span className="item-nome" title={g.nome}>
                {g.nome}
              </span>
              <span className="item-dia">{formatarData(g.data)}</span>
              <span className="item-valor">{formatarBRL(g.valor)}</span>
              <span className="item-acoes">
                <button
                  className="btn-acao"
                  onClick={() => editar(g)}
                  title="Editar"
                  aria-label="Editar"
                >
                  ✏️
                </button>
                <button
                  className="btn-acao"
                  onClick={() => excluir(g)}
                  title="Excluir"
                  aria-label="Excluir"
                >
                  🗑️
                </button>
              </span>
            </li>
          ))}
        </ul>

        {gastosFiltrados.length === 0 && (
          <p className="vazio">Nenhum gasto registrado ainda.</p>
        )}
      </main>
    </div>
  );
}
