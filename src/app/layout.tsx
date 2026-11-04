import type { Metadata } from "next";
import { Forum, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const forum = Forum({ subsets: ["latin"], weight: "400", variable: "--font-forum", display: "swap" });

export const metadata: Metadata = {
  title: "Marília Bezerra | Arquitetura e Interiores em Natal",
  description:
    "Arquitetura que traduz estilo de vida. Interiores com alma e história. Projetos de apartamentos, casas, espaços comerciais e mobiliário autoral da arquiteta Marília Bezerra, em Natal (RN).",
  openGraph: {
    title: "Marília Bezerra | Arquitetura e Interiores",
    description: "Arquitetura que traduz estilo de vida. Interiores com alma e história. Natal, Brasil.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${forum.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
