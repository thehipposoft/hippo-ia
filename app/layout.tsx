import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "./globals.scss";

// Display, headlines y labels — voz "tech"
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Body y títulos — voz "human"
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hippo IA - Sumate a la Revolución",
  description: "Automatizá procesos, potenciá tu equipo y diseñá el futuro con inteligencia artificial de última generación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-body">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
