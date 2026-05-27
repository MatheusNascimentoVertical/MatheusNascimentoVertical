import type { Metadata } from "next";
import { Bebas_Neue, Archivo, Archivo_Black } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const archivo = Archivo({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paizaomodas.com.br"),
  title: {
    default: "Paizão Modas — Moda Masculina no Gama-DF",
    template: "%s | Paizão Modas",
  },
  description:
    "Loja de moda masculina no Gama, Brasília-DF. Streetwear, camisas de time, conjuntos esportivos. Atacado e varejo com envio nacional.",
  keywords: [
    "moda masculina gama",
    "loja roupa masculina brasília",
    "camisa de time df",
    "streetwear gama df",
    "atacado roupa masculina brasília",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Paizão Modas",
    images: ["/og/og-default.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebas.variable} ${archivo.variable} ${archivoBlack.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
