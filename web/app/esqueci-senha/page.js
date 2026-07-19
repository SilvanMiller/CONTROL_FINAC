"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviarLink(e) {
    e.preventDefault();
    setErro("");
    setOk("");
    setCarregando(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/atualizar-senha`,
      });
      if (error) {
        setErro("Nao foi possivel enviar o e-mail. " + error.message);
        return;
      }
      setOk(
        "Se este e-mail estiver cadastrado, enviamos um link para redefinir a senha."
      );
    } catch {
      setErro("Nao foi possivel enviar. Verifique a conexao com o Supabase.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Recuperar senha</h1>

        <form className="auth-form" onSubmit={enviarLink}>
          <input
            type="email"
            className="campo"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {erro && <p className="msg-erro">{erro}</p>}
          {ok && <p className="msg-ok">{ok}</p>}
          <button type="submit" className="btn btn-bloco" disabled={carregando}>
            {carregando ? "Enviando..." : "Enviar link de recuperacao"}
          </button>
        </form>

        <div className="auth-links">
          <Link href="/login">Voltar para o login</Link>
        </div>
      </div>
    </div>
  );
}
