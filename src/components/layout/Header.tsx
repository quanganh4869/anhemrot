"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md text-zinc-100 font-sans">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        
        {/* Editorial Brand Logo */}
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-white hover:text-zinc-300 transition-colors">
          S.
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            {language === "en" ? "Library" : "Thư viện"}
          </Link>
          <Link href="/stories/nightmare-dream" className="hover:text-white transition-colors">
            {language === "en" ? "Featured" : "Nổi bật"}
          </Link>
          <Link href="/admin/stories" className="hover:text-white transition-colors">
            Admin
          </Link>
        </nav>
        
        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === "en" ? "vi" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider rounded"
            aria-label="Toggle language"
          >
            <Globe size={14} />
            <span>{language.toUpperCase()}</span>
          </button>

          <Link 
            href="/login"
            className="px-4 py-1.5 bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors rounded"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
