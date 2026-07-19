import { updateSession } from "@/lib/supabase/proxy";

export default async function proxy(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Aplica em todas as rotas, exceto arquivos estaticos, icones do PWA,
    // o manifest e o service worker (que precisam ser publicos).
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sw.js|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
