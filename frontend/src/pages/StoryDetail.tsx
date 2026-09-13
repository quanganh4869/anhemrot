import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getStoryBySlug } from '../data/stories';
import { Play, Clock, Users, ArrowLeft, BookOpen } from 'lucide-react';

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const story = getStoryBySlug(slug || '');

  if (!story) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full flex-1 flex flex-col pt-8 pb-32">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Breadcrumb / Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-ink/50 hover:text-ink mb-12 transition-colors">
          <ArrowLeft size={16} />
          Back to Library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Cover Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -20, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", damping: 20 }}
            className="lg:col-span-5 w-full aspect-[3/4] md:aspect-[4/5] rounded-xl bg-slate-900 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white/10 group"
          >
             {/* Abstract Cover Visual */}
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-900 transition-transform duration-1000 group-hover:scale-105">
                <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-orange-100 rounded-full blur-2xl opacity-20" />
                <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-story-gold rounded-full blur-3xl opacity-30 mix-blend-screen" />
                
                <div className="relative z-10 flex flex-col items-center text-center px-10">
                  <div className="w-20 h-20 bg-yellow-200 rounded-full shadow-[0_0_60px_rgba(253,224,71,0.6)] mb-8" />
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-balance leading-tight">{story.title}</h2>
                  <p className="text-white/70 italic text-lg font-narrative">by {story.author}</p>
                </div>
             </div>
          </motion.div>

          {/* Right: Info & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="flex gap-4 mb-6">
              <span className="px-3 py-1 bg-story-gold/10 text-story-gold text-xs font-bold rounded-full uppercase tracking-widest border border-story-gold/20">
                {story.type}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 text-ink leading-[1.1] tracking-tight">
              {story.title}
            </h1>

            <div className="flex flex-col gap-1 mb-10 text-ink/70">
              <p className="font-medium text-lg">
                Written by <span className="text-ink font-bold">{story.author}</span>
              </p>
              <p className="font-medium text-lg">
                Illustrated by <span className="text-ink font-bold">{story.illustrator}</span>
              </p>
            </div>

            <div className="prose prose-lg prose-p:font-narrative prose-p:leading-loose prose-p:text-ink/70 mb-12 max-w-2xl">
              <p>
                Before there was nighttime, the world was bathed in constant light. Discover how a small, humble bug was given a very important job by the Sun and the Moon, transforming him forever.
              </p>
              <p>
                A gentle origin tale about finding your purpose and the magic of twilight.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8 mb-12 py-6 border-y border-ink/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-paper-dark flex items-center justify-center border border-ink/5">
                  <Clock size={20} className="text-ink/60" />
                </div>
                <div>
                  <p className="text-xs text-ink/40 font-bold uppercase tracking-wider mb-0.5">Reading Time</p>
                  <p className="font-bold text-ink">{story.readingTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-paper-dark flex items-center justify-center border border-ink/5">
                  <Users size={20} className="text-ink/60" />
                </div>
                <div>
                  <p className="text-xs text-ink/40 font-bold uppercase tracking-wider mb-0.5">Ages</p>
                  <p className="font-bold text-ink">{story.ageRange}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link 
                to={`/story/${story.slug}/read`}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-ink text-paper rounded-full font-bold text-lg hover:bg-story-blue hover:text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                <Play size={20} className="fill-current" />
                Start Reading
              </Link>
              <p className="text-sm text-ink/40 font-medium flex items-center gap-2">
                 <BookOpen size={16} className="text-ink/30"/> 
                 Continuous scroll experience
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
