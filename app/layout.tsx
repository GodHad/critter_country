import type { Metadata } from "next";
import { Outfit, Alfa_Slab_One } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin']
})

const alfa = Alfa_Slab_One({
  variable: '--font-alfa',
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: "Critter Country",
  description: "XIT MUSEUM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} font-outfit ${alfa.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
