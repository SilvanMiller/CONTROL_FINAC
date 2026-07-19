"use client";

import { useEffect } from "react";

// Registra o service worker (/sw.js) depois que a pagina carrega.
export default function RegistrarSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const registrar = () =>
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      window.addEventListener("load", registrar);
      return () => window.removeEventListener("load", registrar);
    }
  }, []);

  return null;
}
