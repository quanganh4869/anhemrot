import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import AuthProvider from "@/features/auth/components/AuthProvider";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "How Firefly Got His Light | Stories for Kids",
  description: "A whimsical children's story about a little firefly.",
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
        className={`${fredoka.variable} ${nunito.variable} antialiased font-sans`}
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
