import { updateSession } from "@/lib/supabase/proxy";

export default async function proxy(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Aplica em todas as rotas, exceto arquivos estaticos e imagens.
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
