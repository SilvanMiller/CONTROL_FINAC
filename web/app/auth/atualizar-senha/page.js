"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Aberta a partir do link de "esqueci a senha". O Supabase cria uma sessao
// temporaria de recuperacao ao abrir esta pagina, permitindo definir a nova
// senha via updateUser.
export default function AtualizarSenhaPage() {
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function salvar(e) {
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
      const { error } = await supabase.auth.updateUser({ password: senha });
      if (error) {
        setErro("Nao foi possivel atualizar a senha. " + error.message);
        return;
      }
      setOk("Senha atualizada! Redirecionando...");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch {
      setErro("Nao foi possivel atualizar. Verifique a conexao com o Supabase.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1>Nova senha</h1>

        <form className="auth-form" onSubmit={salvar}>
          <input
            type="password"
            className="campo"
            placeholder="Nova senha (min. 6 caracteres)"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input
            type="password"
            className="campo"
            placeholder="Confirmar nova senha"
            value={confirma}
            onChange={(e) => setConfirma(e.target.value)}
            required
          />
          {erro && <p className="msg-erro">{erro}</p>}
          {ok && <p className="msg-ok">{ok}</p>}
          <button type="submit" className="btn btn-bloco" disabled={carregando}>
            {carregando ? "Salvando..." : "Salvar nova senha"}
          </button>
        </form>
      </div>
    </div>
  );
}
