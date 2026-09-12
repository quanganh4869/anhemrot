"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import { Play, TrendingUp, Sparkles, Clock } from "lucide-react";

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans">
      <Header />
      <main className="w-full flex-grow flex flex-col">
        
        {/* Massive Cinematic Hero Carousel (Simulated) */}
        <section className="relative w-full h-[70vh] min-h-[600px] flex items-center">
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/story/scene_01_bg.webp" 
              alt="Hero Background" 
              className="w-full h-full object-cover opacity-60 scale-105 animate-[kenburns_20s_ease-in-out_infinite_alternate]"
            />
            {/* Gradients to fade into black at the bottom and edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-start gap-6 mt-20">
            <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-emerald-400 ring-1 ring-emerald-400/30 flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
              <Sparkles className="w-4 h-4" />
              {language === "en" ? "Editor's Pick" : "Lựa chọn của Biên tập"}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black font-fredoka leading-[1.1] text-white max-w-3xl drop-shadow-2xl">
              {language === "en" ? "A Nightmare That Wanted To Become A Beautiful Dream" : "Cơn Ác Mộng Muốn Trở Thành Một Giấc Mơ Đẹp"}
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-300 max-w-2xl font-medium drop-shadow-md">
              {language === "en" 
                ? "An emotional scrollytelling journey through the Realm of Dreams. Experience the comic that reads like a movie." 
                : "Hành trình cuộn mượt mà qua Vùng Đất Giấc Mơ. Trải nghiệm một câu chuyện tương tác như đang xem một bộ phim điện ảnh."}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <Link 
                href="/stories/nightmare-dream"
                className="bg-white hover:bg-zinc-200 text-black px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                {language === "en" ? "View Details" : "Xem Chi Tiết"}
              </Link>
              <Link 
                href="/stories/nightmare-dream/read"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-colors ring-1 ring-white/20"
              >
                <Play className="w-5 h-5 fill-current" />
                {language === "en" ? "Read Chapter 1" : "Đọc Tập 1"}
              </Link>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-fredoka flex items-center gap-2 text-white">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              {language === "en" ? "Trending Now" : "Thịnh hành nhất"}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            
            {/* Story Card 1 */}
            <Link href="/stories/nightmare-dream" className="group flex flex-col gap-3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/story/scene_02_title.webp" alt="Nightmare Dream" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                  Cinematic
                </div>
                <div className="absolute bottom-3 left-3 right-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-full bg-white text-black text-center py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 fill-current" /> Read Now
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                  {language === "en" ? "A Nightmare That Wanted To Become A Beautiful Dream" : "Cô Gái Bán Diêm"}
                </h3>
                <p className="text-sm text-zinc-400">San Anh & Mr. Ngòi</p>
              </div>
            </Link>

            {/* Story Card 2 */}
            <Link href="#" className="group flex flex-col gap-3">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/hero_firefly.png" alt="Firefly" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70" />
                <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50 backdrop-blur text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                  New
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                  {language === "en" ? "How Firefly Got His Light" : "Chú Đom Đóm Tìm Lại Ánh Sáng"}
                </h3>
                <p className="text-sm text-zinc-400">Daniel Errico</p>
              </div>
            </Link>

            {/* Dummy Cards for Layout */}
            {[1, 2].map((i) => (
               <div key={i} className="group flex flex-col gap-3 opacity-40 cursor-not-allowed">
               <div className="relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-white/10 bg-zinc-900/50 flex flex-col items-center justify-center">
                 <Clock className="w-8 h-8 text-zinc-600 mb-2" />
                 <span className="text-zinc-500 font-medium text-sm uppercase tracking-wider">Coming Soon</span>
               </div>
               <div>
                 <div className="h-5 w-3/4 bg-zinc-800 rounded animate-pulse mb-2" />
                 <div className="h-4 w-1/2 bg-zinc-800/50 rounded animate-pulse" />
               </div>
             </div>
            ))}

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
