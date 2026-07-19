import "./globals.css";
import RegistrarSW from "@/components/RegistrarSW";

export const metadata = {
  title: "Caderneta de Gastos",
  description:
    "Organizador de gastos com visual de caderno. Registre despesas e acompanhe o total por mes.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Caderneta",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-icon-180.png",
  },
};

export const viewport = {
  themeColor: "#f7f4e9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <RegistrarSW />
      </body>
    </html>
  );
}
