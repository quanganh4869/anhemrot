import React, { useState, useEffect, useRef, useCallback } from 'react';
import { storySlides } from './data/slidesData';
import { MorphStage } from './components/MorphStage';
import { ScrollProgress } from './components/ScrollProgress';
import { Maximize2, Minimize2, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const StoryApp: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef<boolean>(false);

  const totalSlides = storySlides.length; // 31
  const maxProgress = totalSlides - 1; // 30

  // Music toggle function
  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    userInteractedRef.current = true;

    if (audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch((err) => {
        console.warn('Audio play prevented:', err);
      });
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  }, []);

  // Try auto-starting music on first user interaction (click or scroll)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userInteractedRef.current && audioRef.current) {
        userInteractedRef.current = true;
        audioRef.current.volume = 0.7;
        audioRef.current.play().then(() => {
          setIsAudioPlaying(true);
        }).catch(() => {
          // Autoplay blocked by browser until user explicitly clicks
        });
      }
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('wheel', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Smooth lerp loop for 60fps/120fps fluid motion
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.12;
        setProgress(currentProgressRef.current);
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Update target progress on native window scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const p = (scrollY / maxScroll) * maxProgress;
        targetProgressRef.current = Math.max(0, Math.min(maxProgress, p));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxProgress]);

  // Autoplay engine (runs at ~5.1 seconds per slide, exactly matching 160s video demo)
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    // When autoplay starts, also start music if not playing
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => {});
    }

    const interval = window.setInterval(() => {
      const nextSlide = Math.floor(targetProgressRef.current + 1);
      if (nextSlide > maxProgress) {
        setIsPlaying(false);
      } else {
        scrollToSlide(nextSlide);
      }
    }, 5100);

    autoPlayTimerRef.current = interval;

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, maxProgress]);

  const scrollToSlide = useCallback(
    (slideIndex: number) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const targetScrollY = (slideIndex / maxProgress) * maxScroll;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    },
    [maxProgress]
  );

  // Keyboard controls: ArrowDown, ArrowUp, Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        const next = Math.min(maxProgress, Math.floor(targetProgressRef.current + 1));
        scrollToSlide(next);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prev = Math.max(0, Math.ceil(targetProgressRef.current - 1));
        scrollToSlide(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [maxProgress, scrollToSlide]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen failed:', err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const currentSlideIndex = Math.min(totalSlides, Math.max(1, Math.round(progress) + 1));

  return (
    <div className="relative w-full bg-black text-white selection:bg-[#ED0081]/40">
      {/* Background Audio Soundtrack */}
      <audio
        ref={audioRef}
        src="/media/soundtrack.wav"
        loop
        preload="auto"
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
      />

      {/* Pinned Presentation Stage with Morph Transitions */}
      <MorphStage slides={storySlides} progress={progress} />

      {/* Top Floating Controls (Subtle & Non-Intrusive) */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Music Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          aria-label={isAudioPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
          title={isAudioPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isAudioPlaying
              ? 'bg-[#ED0081] text-white border-white/30 shadow-[0_0_15px_rgba(237,0,129,0.5)] scale-105'
              : 'bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border-white/15 opacity-60 hover:opacity-100 hover:scale-105'
          }`}
        >
          {isAudioPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
        </button>

        {/* Auto Play / Pause Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Tạm dừng' : 'Tự động phát'}
          title={isPlaying ? 'Tạm dừng' : 'Tự động chiếu như video'}
          className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isPlaying
              ? 'bg-[#ED0081] text-white border-white/30 scale-105 shadow-[0_0_15px_rgba(237,0,129,0.5)]'
              : 'bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border-white/15 opacity-60 hover:opacity-100 hover:scale-105'
          }`}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          aria-label="Toggle Fullscreen"
          title="Toàn màn hình"
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white backdrop-blur-md border border-white/15 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-105"
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      {/* Minimal Scene Dot Navigation on Right */}
      <ScrollProgress totalScenes={totalSlides} currentScene={currentSlideIndex} />

      {/* Scroll Track: Drives the continuous Morph progress */}
      <div
        className="relative w-full pointer-events-none"
        style={{ height: `${totalSlides * 100}vh` }}
      >
        {/* Invisible anchor checkpoints for scroll navigation */}
        {storySlides.map((slide, idx) => (
          <div
            key={slide.id}
            id={slide.id}
            className="w-full h-screen"
            style={{ top: `${idx * 100}vh` }}
          />
        ))}
      </div>
    </div>
  );
};

export default StoryApp;
