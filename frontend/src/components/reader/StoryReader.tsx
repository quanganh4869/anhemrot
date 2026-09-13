import { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScroll, useSpring } from 'framer-motion';
import { getStoryBySlug } from '../../data/stories';
import { ArrowLeft, Maximize, Volume2 } from 'lucide-react';
import StoryPage from './StoryPage';
import StoryProgress from './StoryProgress';
import StoryBackground from './StoryBackground';

export default function StoryReader() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const story = getStoryBySlug(slug || '');
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Use scroll progress for the whole container
  const { scrollYProgress } = useScroll({
    container: containerRef as React.RefObject<HTMLElement>
  });
  
  // Smooth the scroll progress slightly for background color transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!story) {
    return <div>Story not found</div>;
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f4f1ea] font-sans selection:bg-cyan-200">
      {/* Global Background Layer */}
      <StoryBackground scenes={story.scenes} progress={smoothProgress} />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/10 to-transparent pointer-events-none">
        <button 
          onClick={() => navigate(`/story/${story.slug}`)}
          className="pointer-events-auto flex items-center gap-2 text-white hover:text-white/80 transition-colors drop-shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-display font-medium text-lg hidden sm:inline">{story.title}</span>
        </button>
        
        <div className="pointer-events-auto flex items-center gap-4">
          <button className="text-white hover:text-white/80 transition-colors drop-shadow-md">
            <Volume2 className="w-5 h-5" />
          </button>
          <button onClick={toggleFullscreen} className="text-white hover:text-white/80 transition-colors drop-shadow-md">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Progress Rail */}
      <StoryProgress total={story.scenes.length} progress={scrollYProgress} containerRef={containerRef} />

      {/* Main Scrolling Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-proximity scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="relative w-full flex flex-col">
          {story.scenes.map((scene, index) => (
            <StoryPage 
              key={scene.id} 
              scene={scene} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
