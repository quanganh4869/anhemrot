import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import AuthProvider from "@/features/auth/components/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interactive Web Comic",
  description: "A cinematic storytelling platform.",
};

import GlobalAudioPlayer from "@/components/layout/GlobalAudioPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans bg-zinc-950 text-zinc-100`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
            <GlobalAudioPlayer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
