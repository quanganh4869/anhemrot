"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Home() {
  const { language } = useLanguage();

  const featuredStory = {
    slug: "nightmare-dream",
    title: language === "en" ? "A Nightmare That Wanted To Become A Beautiful Dream" : "Cơn Ác Mộng Muốn Trở Thành Một Giấc Mơ Đẹp",
    author: "San Anh",
    cover: "/images/story/scene_02_title.webp",
    description: language === "en" 
      ? "An interactive scrollytelling journey through the Realm of Dreams. Experience the comic that reads like a movie."
      : "Hành trình cuộn mượt mà qua Vùng Đất Giấc Mơ. Trải nghiệm câu chuyện tương tác như một bộ phim."
  };

  const stories = [
    {
      title: "How Firefly Got His Light",
      author: "Daniel Errico",
      cover: "/images/hero_firefly.png",
      slug: "firefly",
    },
    {
      title: "The Silent Echo",
      author: "Jane Doe",
      cover: "/images/story/scene_01_bg.webp",
      slug: "echo",
    }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans">
      
      {/* Minimal Nav */}
      <nav className="w-full px-6 py-8 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tight">
          S.
        </Link>
        <div className="flex gap-6 text-sm font-medium text-zinc-400">
          <Link href="/" className="text-zinc-100">Library</Link>
          <Link href="/admin/stories" className="hover:text-zinc-100 transition-colors">Admin</Link>
          <Link href="/login" className="hover:text-zinc-100 transition-colors">Login</Link>
        </div>
      </nav>

      <main className="w-full flex-grow flex flex-col max-w-7xl mx-auto px-6 pb-24">
        
        {/* Editorial Featured Section */}
        <section className="w-full mt-12 mb-32 flex flex-col md:flex-row gap-12 md:gap-24 items-center">
          
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-6">
              {featuredStory.title}
            </h1>
            <p className="text-lg text-zinc-400 mb-10 max-w-md leading-relaxed">
              {featuredStory.description}
            </p>
            <div className="flex items-center gap-6 border-t border-zinc-800 pt-6">
              <div className="text-sm">
                <span className="block text-zinc-500 mb-1">Author</span>
                <span className="font-medium">{featuredStory.author}</span>
              </div>
              <Link 
                href={`/stories/${featuredStory.slug}`}
                className="ml-auto px-8 py-3 bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
              >
                Read Story
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2">
            <Link href={`/stories/${featuredStory.slug}`} className="block relative w-full aspect-[4/5] bg-zinc-900 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={featuredStory.cover} 
                alt={featuredStory.title}
                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-80"
              />
            </Link>
          </div>
          
        </section>

        {/* Clean Grid */}
        <section className="w-full">
          <h2 className="text-xl font-serif mb-8 border-b border-zinc-800 pb-4">
            Recent Publications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {stories.map((story) => (
              <Link key={story.slug} href={`/stories/${story.slug}`} className="group block">
                <div className="w-full aspect-video bg-zinc-900 mb-4 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={story.cover} 
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl mb-1 group-hover:text-zinc-300 transition-colors">{story.title}</h3>
                <p className="text-zinc-500 text-sm">{story.author}</p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
