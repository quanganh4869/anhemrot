"use client";

import Link from "next/link";
import { Menu, BookOpen, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-twilight/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-firefly-glow p-2 rounded-full text-twilight group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <span className="font-display text-xl font-bold text-twilight dark:text-firefly-glow sm:text-2xl tracking-wide">
              {language === "en" ? "Stories for Kids" : "Truyện Cho Bé"}
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-twilight dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors">
            {t("home")}
          </Link>
          <Link href="#" className="text-sm font-semibold text-twilight dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors">
            {t("allStories")}
          </Link>
          <Link href="#" className="text-sm font-semibold text-twilight dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors">
            {t("aboutAuthor")}
          </Link>
          <Link href="#" className="text-sm font-semibold text-twilight dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors">
            {t("contact")}
          </Link>
        </nav>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setLanguage(language === "en" ? "vi" : "en")}
            className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-twilight dark:text-slate-200 transition-colors text-sm font-bold"
            aria-label="Toggle language"
          >
            <Globe size={18} />
            <span>{language.toUpperCase()}</span>
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-twilight dark:text-slate-200 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <button className="hidden md:block rounded-full bg-accent px-5 py-2 text-sm font-bold text-white hover:bg-sky-400 transition-colors shadow-sm ml-2">
            {t("subscribe")}
          </button>
          <button className="md:hidden p-2 text-twilight dark:text-slate-200">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
