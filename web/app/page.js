import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Caderneta from "@/components/Caderneta";

// Pagina inicial (protegida). Busca o usuario e seus gastos no servidor e
// entrega para o componente da caderneta cuidar do CRUD.
export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: gastos } = await supabase
    .from("gastos")
    .select("*")
    .order("data", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <Caderneta
      initialGastos={gastos ?? []}
      userId={user.id}
      userEmail={user.email}
    />
  );
}
