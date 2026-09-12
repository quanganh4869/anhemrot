"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import { Play } from "lucide-react";

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="w-full flex-grow flex flex-col items-center">
        
        {/* Simple Hero Section */}
        <section className="w-full max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          
          {/* Story Cover */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/story/scene_02_title.webp" 
                alt="Story Cover" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link 
                  href="/stories/nightmare-dream"
                  className="bg-primary text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-xl hover:scale-105 transition-transform"
                >
                  <Play className="w-5 h-5 fill-current" />
                  {language === "en" ? "Read Animated Story" : "Đọc truyện tương tác"}
                </Link>
              </div>
            </div>
          </div>

          {/* Story Info */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="space-y-2">
              <span className="text-primary font-bold tracking-wider uppercase text-sm">
                {language === "en" ? "Featured Story" : "Truyện nổi bật"}
              </span>
              <h1 className="text-4xl md:text-5xl font-black font-fredoka leading-tight text-zinc-900 dark:text-white">
                {language === "en" ? "A Nightmare That Wanted To Become A Beautiful Dream" : "Có Một Ác Mộng Muốn Trở Thành Một Giấc Mơ Đẹp"}
              </h1>
            </div>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {language === "en" 
                ? "Follow the emotional journey of a little nightmare cast out by the gods, searching for its true purpose in the Realm of Dreams. An interactive scrollytelling experience." 
                : "Hành trình cảm động của một cơn ác mộng nhỏ bé trên con đường đi tìm bản ngã và tình yêu thương thực sự tại Sảnh Giấc Mơ. Một trải nghiệm đọc truyện tương tác hoàn toàn mới."}
            </p>

            <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
              <div className="flex flex-col">
                <span className="uppercase text-xs text-zinc-400">{language === "en" ? "Author" : "Sáng tác"}</span>
                <span className="text-zinc-900 dark:text-zinc-100">San Anh</span>
              </div>
              <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-800" />
              <div className="flex flex-col">
                <span className="uppercase text-xs text-zinc-400">{language === "en" ? "Illustrator" : "Minh họa"}</span>
                <span className="text-zinc-900 dark:text-zinc-100">Mr. Ngài</span>
              </div>
            </div>

            <div className="pt-4">
              <Link 
                href="/stories/nightmare-dream"
                className="inline-flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 hover:-translate-y-1 transition-all"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                {language === "en" ? "Start Reading" : "Bắt đầu đọc"}
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
