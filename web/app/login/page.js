"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrarComEmail(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });
      if (error) {
        setErro("E-mail ou senha invalidos.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setErro("Nao foi possivel entrar. Verifique a conexao com o Supabase.");
    } finally {
      setCarregando(false);
    }
  }

  async function entrarComGoogle() {
    setErro("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) setErro("Nao foi possivel entrar com o Google.");
    } catch {
      setErro("Nao foi possivel entrar com o Google.");
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Entrar</h1>

        <button
          type="button"
          className="btn btn-google btn-bloco"
          onClick={entrarComGoogle}
        >
          Entrar com Google
        </button>

        <div className="divisor">ou</div>

        <form className="auth-form" onSubmit={entrarComEmail}>
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
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          {erro && <p className="msg-erro">{erro}</p>}
          <button type="submit" className="btn btn-bloco" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="auth-links">
          <Link href="/esqueci-senha">Esqueci minha senha</Link>
          <span>
            Nao tem conta? <Link href="/cadastro">Cadastre-se</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
