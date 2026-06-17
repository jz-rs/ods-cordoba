import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ODS Córdoba – Agenda 2030",
  description: "Objetivos de Desarrollo Sostenible en la ciudad de Córdoba. Iniciativa UBP · ULA · BIOCBA.",
  icons: {
    icon: "/logos/navegador.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
