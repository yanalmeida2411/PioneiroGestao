import type { Metadata } from "next";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Gestão Pioneiro",
  description: "Controle de Compra e venda pioneiro",
  icons:{
    icon:'/logoeta.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Tektur:wght@400..900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: 'Tektur, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
