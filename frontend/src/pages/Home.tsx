import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { stories } from '../data/stories';
import { Sparkles, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function Home() {
  const featuredStory = stories[0];

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-24 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-story-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-story-blue/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-paper-dark border border-ink/10 mb-8 shadow-sm"
          >
            <Sparkles size={14} className="text-story-gold" />
            <span className="text-xs font-bold uppercase tracking-widest text-ink/70">Interactive Storybook</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8 max-w-4xl tracking-tight"
          >
            Stories that <span className="italic text-ink/80 font-normal">come alive</span> as you scroll.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-ink/60 max-w-2xl font-narrative leading-relaxed mb-12"
          >
            Immerse yourself in cinematic digital storybooks crafted for children and families. No pages to flip, just continuous magic.
          </motion.p>
        </div>
      </section>

      {/* Library Section */}
      <section className="max-w-6xl mx-auto px-6 w-full pb-32 z-10">
        <div className="flex items-end justify-between mb-8 border-b border-ink/10 pb-4">
          <h2 className="text-2xl font-display font-bold tracking-wide">Featured Story</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-10 bg-paper-light rounded-3xl overflow-hidden shadow-book border border-ink/5 group hover:shadow-xl transition-shadow duration-500">
          <div className="lg:col-span-7 h-[350px] lg:h-[500px] w-full bg-slate-900 relative overflow-hidden">
             {/* Abstract Cover Visual */}
             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-900 transition-transform duration-700 group-hover:scale-105">
                <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-orange-100 rounded-full blur-xl opacity-20" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-story-gold rounded-full blur-2xl opacity-40 mix-blend-screen" />
                <div className="w-20 h-20 bg-yellow-200 rounded-full shadow-[0_0_50px_rgba(253,224,71,0.8)] z-10" />
             </div>
          </div>
          
          <div className="lg:col-span-5 flex flex-col items-start p-8 lg:p-12 lg:pl-4 justify-center">
            <div className="flex gap-3 mb-6">
              <span className="px-3 py-1 bg-story-blue/10 text-story-blue text-xs font-bold rounded-full uppercase tracking-wider">
                {featuredStory.type}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-ink/50 uppercase tracking-wider">
                <Clock size={14} /> {featuredStory.readingTime}
              </span>
            </div>
            
            <h3 className="text-4xl lg:text-5xl font-display font-bold mb-4 group-hover:text-story-blue transition-colors duration-300 leading-tight">
              {featuredStory.title}
            </h3>
            
            <p className="text-ink/60 font-narrative text-lg leading-relaxed mb-8">
              {featuredStory.shortDescription}
            </p>
            
            <Link 
              to={`/story/${featuredStory.slug}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-ink text-paper rounded-full font-semibold hover:bg-story-blue hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-md"
            >
              Explore Story
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Coming Soon Placeholder */}
        <div className="mt-24">
          <h2 className="text-2xl font-display font-bold tracking-wide mb-8 border-b border-ink/10 pb-4">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-not-allowed group/card">
                <div className="aspect-[4/3] rounded-2xl bg-paper-dark flex flex-col items-center justify-center border border-ink/10 border-dashed overflow-hidden relative">
                  <BookOpen size={32} className="text-ink/20 mb-3 group-hover/card:scale-110 transition-transform duration-500" />
                  <span className="text-ink/40 font-semibold uppercase tracking-widest text-xs">In Development</span>
                </div>
                <div>
                  <div className="h-3 w-1/4 bg-ink/10 rounded mb-3"></div>
                  <div className="h-6 w-3/4 bg-ink/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
