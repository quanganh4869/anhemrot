import Image from "next/image";

interface StoryHeroProps {
  title: string;
  author: string;
  coverImage: string;
}

export default function StoryHero({ title, author, coverImage }: StoryHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-twilight pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-center items-center">
        <div className="w-[800px] h-[800px] bg-firefly-glow rounded-full blur-[120px] mix-blend-screen translate-y-32"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight max-w-4xl">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-sans mb-12 italic">
            By {author}
          </p>
          
          <div className="relative w-full max-w-3xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 ring-4 ring-firefly-glow/30">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
