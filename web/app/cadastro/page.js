"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar(e) {
    e.preventDefault();
    setErro("");
    setOk("");

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== confirma) {
      setErro("As senhas nao coincidem.");
      return;
    }

    setCarregando(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        setErro("Nao foi possivel cadastrar. " + error.message);
        return;
      }
      setOk(
        "Cadastro realizado! Verifique seu e-mail para confirmar a conta."
      );
    } catch {
      setErro("Nao foi possivel cadastrar. Verifique a conexao com o Supabase.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Criar conta</h1>

        <form className="auth-form" onSubmit={cadastrar}>
          <input
            type="email"
            className="campo"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="campo"
            placeholder="Senha (min. 6 caracteres)"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input
            type="password"
            className="campo"
            placeholder="Confirmar senha"
            value={confirma}
            onChange={(e) => setConfirma(e.target.value)}
            required
          />
          {erro && <p className="msg-erro">{erro}</p>}
          {ok && <p className="msg-ok">{ok}</p>}
          <button type="submit" className="btn btn-bloco" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="auth-links">
          <span>
            Ja tem conta? <Link href="/login">Entrar</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
