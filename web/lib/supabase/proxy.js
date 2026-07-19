// Atualiza a sessao do Supabase a cada requisicao e protege rotas.
// (No Next.js 16, "middleware" passou a se chamar "proxy".)
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Rotas publicas (nao exigem login)
const ROTAS_PUBLICAS = ["/login", "/cadastro", "/esqueci-senha", "/auth"];

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  // Enquanto o Supabase nao estiver configurado (.env.local), nao protege
  // rotas — permite rodar o app durante o desenvolvimento da estrutura.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANTE: nao rode codigo entre createServerClient e getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const ehRotaPublica = ROTAS_PUBLICAS.some((rota) =>
    pathname.startsWith(rota)
  );

  // Sem usuario e tentando acessar rota protegida -> manda para /login
  if (!user && !ehRotaPublica) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
