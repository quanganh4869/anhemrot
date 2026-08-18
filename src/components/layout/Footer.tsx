"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-twilight dark:bg-slate-900 text-white py-12 mt-16 border-t-[16px] border-accent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold text-firefly-glow mb-4">
              {language === "en" ? "Stories for Kids" : "Truyện Cho Bé"}
            </h3>
            <p className="text-slate-300 dark:text-slate-400 mb-6 max-w-md">
              {t("footerDesc")}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-3 bg-slate-800 dark:bg-slate-800 rounded-full hover:bg-accent transition-colors font-bold text-xs flex items-center justify-center w-10 h-10">
                FB
              </Link>
              <Link href="#" className="p-3 bg-slate-800 dark:bg-slate-800 rounded-full hover:bg-accent transition-colors font-bold text-xs flex items-center justify-center w-10 h-10">
                TW
              </Link>
              <Link href="#" className="p-3 bg-slate-800 dark:bg-slate-800 rounded-full hover:bg-accent transition-colors font-bold text-xs flex items-center justify-center w-10 h-10">
                IG
              </Link>
              <Link href="#" className="p-3 bg-slate-800 dark:bg-slate-800 rounded-full hover:bg-accent transition-colors font-bold text-xs flex items-center justify-center w-10 h-10">
                YT
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t("quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-firefly-glow transition-colors">{t("home")}</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-firefly-glow transition-colors">{t("allStories")}</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-firefly-glow transition-colors">{t("aboutAuthor")}</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-firefly-glow transition-colors">{t("contact")}</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t("legal")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-firefly-glow transition-colors">{t("terms")}</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-firefly-glow transition-colors">{t("privacy")}</Link>
              </li>
              <li>
                <Link href="#" className="text-slate-300 dark:text-slate-400 hover:text-firefly-glow transition-colors">{t("cookies")}</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} {t("rights")}
        </div>
      </div>
    </footer>
  );
}
