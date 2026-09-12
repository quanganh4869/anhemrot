"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-white mb-2 inline-block">
            S.
          </Link>
          <p className="text-sm text-zinc-500 max-w-sm">
            {language === "en" 
              ? "An interactive cinematic web comic and visual storytelling platform." 
              : "Nền tảng truyện tranh tương tác và điện ảnh trực tuyến."}
          </p>
        </div>

        <div className="flex gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-white transition-colors">
            {language === "en" ? "Library" : "Thư viện"}
          </Link>
          <Link href="/stories/nightmare-dream" className="hover:text-white transition-colors">
            {language === "en" ? "Featured" : "Nổi bật"}
          </Link>
          <Link href="/admin" className="hover:text-white transition-colors">
            Admin
          </Link>
        </div>

        <div className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Story Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
