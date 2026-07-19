import "./globals.css";

export const metadata = {
  title: "Caderneta de Gastos",
  description:
    "Organizador de gastos com visual de caderno. Registre despesas e acompanhe o total por mes.",
};

export const viewport = {
  themeColor: "#f7f4e9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
