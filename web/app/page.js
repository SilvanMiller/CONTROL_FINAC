import Link from "next/link";

// Pagina inicial (protegida pelo proxy quando o Supabase estiver configurado).
// Por enquanto e a "casca" da caderneta; o CRUD sera ligado ao Supabase
// no proximo passo (assim que houver URL + anon key).
export default function Home() {
  return (
    <main style={{ display: "flex", justifyContent: "center", padding: 12 }}>
      <div className="caderneta">
        <h1 className="titulo">Caderneta de Gastos</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            color: "var(--tinta)",
            lineHeight: "var(--linha-altura)",
            borderBottom: "2px solid var(--tinta)",
          }}
        >
          <span>Gastos</span>
          <span>Dia</span>
          <span>Valor R$</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#7a4a2b",
            fontWeight: "bold",
            lineHeight: "var(--linha-altura)",
          }}
        >
          <span>Qntdd.: 0</span>
          <span>Total: R$ 0,00</span>
        </div>

        <p
          style={{
            lineHeight: "var(--linha-altura)",
            color: "#8a97a3",
            fontStyle: "italic",
          }}
        >
          Estrutura em Next.js pronta. Conecte o Supabase para registrar os
          gastos na nuvem.
        </p>

        <p style={{ marginTop: 24 }}>
          <Link href="/login" className="btn" style={{ textDecoration: "none" }}>
            Ir para o login
          </Link>
        </p>
      </div>
    </main>
  );
}
