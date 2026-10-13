import React, { useState, useEffect, useRef, useCallback } from 'react';
import { storySlides } from './data/slidesData';
import { MorphStage } from './components/MorphStage';
import { ScrollProgress } from './components/ScrollProgress';
import { Maximize2, Minimize2, Volume2, Volume1, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

export const StoryApp: React.FC = () => {
  const initialSlideParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('slide') : null;
  const initialSlideVal = initialSlideParam ? Math.max(0, parseFloat(initialSlideParam) - 1) : 0;
  const [progress, setProgress] = useState<number>(initialSlideVal);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  const prevVolumeRef = useRef<number>(0.7);
  const volumeTimeoutRef = useRef<number | null>(null);
  const targetProgressRef = useRef<number>(initialSlideVal);
  const currentProgressRef = useRef<number>(initialSlideVal);
  const animFrameRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef<boolean>(false);

  const totalSlides = storySlides.length; // 31
  const maxProgress = totalSlides - 1; // 30

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (initialSlideVal > 0) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        window.scrollTo({ top: (initialSlideVal / maxProgress) * maxScroll, behavior: 'instant' as any });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
      targetProgressRef.current = 0;
      currentProgressRef.current = 0;
      setProgress(0);
    }
  }, [initialSlideVal, maxProgress]);

  // Preload images for current and upcoming slides to ensure smooth zero-jank transitions on production
  useEffect(() => {
    const currentIdx = Math.floor(progress);
    const indicesToPreload = [currentIdx, currentIdx + 1, currentIdx + 2, currentIdx - 1];

    indicesToPreload.forEach((idx) => {
      if (idx >= 0 && idx < storySlides.length) {
        storySlides[idx].elements.forEach((el) => {
          if (el.media) {
            const img = new Image();
            img.decoding = 'async';
            img.src = `/media/${el.media}`;
          }
        });
      }
    });
  }, [Math.floor(progress)]);

  const resetVolumeTimeout = useCallback(() => {
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    volumeTimeoutRef.current = window.setTimeout(() => {
      setShowVolumeSlider(false);
    }, 3500);
  }, []);

  const handleVolumeChange = useCallback((newVol: number) => {
    userInteractedRef.current = true;
    setVolume(newVol);
    resetVolumeTimeout();

    if (newVol > 0) {
      setIsMuted(false);
      prevVolumeRef.current = newVol;
    } else {
      setIsMuted(true);
    }

    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsAudioPlaying(true);
        }).catch(() => {});
      }
    }
  }, [resetVolumeTimeout]);

  // Music toggle function
  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    userInteractedRef.current = true;
    setShowVolumeSlider(true);
    resetVolumeTimeout();

    if (audioRef.current.paused) {
      if (isMuted || volume === 0) {
        const restored = prevVolumeRef.current > 0 ? prevVolumeRef.current : 0.7;
        setVolume(restored);
        setIsMuted(false);
        audioRef.current.volume = restored;
      }
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch((err) => {
        console.warn('Audio play prevented:', err);
      });
    } else {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  }, [isMuted, volume, resetVolumeTimeout]);

  // Try auto-starting music on first user interaction (click or scroll)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userInteractedRef.current && audioRef.current) {
        userInteractedRef.current = true;
        audioRef.current.volume = volume;
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
      if (Math.abs(diff) > 0.0012) {
        currentProgressRef.current += diff * 0.14;
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

    // Sync scroll immediately on mount
    handleScroll();

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

  const scrollAnimRef = useRef<number | null>(null);

  const scrollToSlide = useCallback(
    (slideIndex: number) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const targetScrollY = (slideIndex / maxProgress) * maxScroll;
      const startScrollY = window.scrollY;
      const distance = targetScrollY - startScrollY;
      if (Math.abs(distance) < 1) return;

      if (scrollAnimRef.current) cancelAnimationFrame(scrollAnimRef.current);

      const startTime = performance.now();
      // Chuyển trang chậm lại 5 lần (~2500ms thay vì ~500ms)
      const duration = 2500;

      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progressTime = Math.min(1, elapsed / duration);
        const eased = easeInOutCubic(progressTime);
        const currentY = startScrollY + distance * eased;

        window.scrollTo({ top: currentY, behavior: 'instant' as any });

        if (progressTime < 1) {
          scrollAnimRef.current = requestAnimationFrame(step);
        } else {
          scrollAnimRef.current = null;
        }
      };

      scrollAnimRef.current = requestAnimationFrame(step);
    },
    [maxProgress]
  );

  // Keyboard controls: ArrowDown, ArrowUp, Space
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(maxProgress, Math.floor(targetProgressRef.current + 1));
        scrollToSlide(next);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
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

      {/* Bottom Center Slide Navigation (Only 2 arrows, placed at bottom center with safe-area padding for mobile) */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 sm:gap-4 bg-black/75 hover:bg-black/90 active:bg-black/95 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 shadow-2xl transition-all select-none">
        <button
          onClick={() => scrollToSlide(Math.max(0, currentSlideIndex - 2))}
          disabled={currentSlideIndex <= 1}
          aria-label="Trang trước"
          title="Trang trước (Phím Mũi tên lên / Trái)"
          className="p-1.5 sm:p-2 rounded-full text-white/80 hover:text-white active:scale-90 hover:bg-white/10 disabled:opacity-20 disabled:hover:text-white/80 disabled:hover:bg-transparent transition-all"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => scrollToSlide(Math.min(maxProgress, currentSlideIndex))}
          disabled={currentSlideIndex >= totalSlides}
          aria-label="Trang sau"
          title="Trang sau (Phím Mũi tên xuống / Phải / Space)"
          className="p-1.5 sm:p-2 rounded-full text-white/80 hover:text-white active:scale-90 hover:bg-white/10 disabled:opacity-20 disabled:hover:text-white/80 disabled:hover:bg-transparent transition-all"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Top Floating Controls (Subtle & Non-Intrusive, Mobile Responsive) */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 sm:gap-2">
        {/* Music Audio Toggle & Volume Slider */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => {
            if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
            setShowVolumeSlider(true);
          }}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          {/* Collapsible Volume Slider */}
          <div
            className={`flex items-center gap-1.5 sm:gap-2 overflow-hidden transition-all duration-300 ease-out bg-black/75 backdrop-blur-md border border-white/20 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 mr-1 sm:mr-1.5 shadow-xl ${
              showVolumeSlider
                ? 'w-28 sm:w-36 opacity-100 pointer-events-auto'
                : 'w-0 opacity-0 pointer-events-none p-0 border-0 m-0'
            }`}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              aria-label="Âm lượng nhạc"
              className="w-14 sm:w-20 h-1.5 bg-white/25 rounded-lg appearance-none cursor-pointer accent-[#ED0081] focus:outline-none"
            />
            <span className="text-[10px] sm:text-[11px] font-semibold text-white/90 tabular-nums min-w-[24px] sm:min-w-[28px] text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>

          {/* Music Audio Toggle Button */}
          <button
            onClick={toggleAudio}
            aria-label={isAudioPlaying && !isMuted && volume > 0 ? 'Tắt nhạc' : 'Bật nhạc'}
            title={isAudioPlaying && !isMuted && volume > 0 ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
            className={`p-2 sm:p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
              isAudioPlaying && !isMuted && volume > 0
                ? 'bg-[#ED0081] text-white border-white/30 shadow-[0_0_15px_rgba(237,0,129,0.5)] scale-105'
                : 'bg-black/50 hover:bg-black/80 text-white/70 hover:text-white border-white/15 opacity-70 hover:opacity-100 hover:scale-105'
            }`}
          >
            {!isAudioPlaying || isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            ) : volume < 0.5 ? (
              <Volume1 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 animate-pulse" />
            )}
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          aria-label="Toggle Fullscreen"
          title="Toàn màn hình"
          className="p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white backdrop-blur-md border border-white/15 transition-all duration-300 opacity-70 hover:opacity-100 hover:scale-105"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          ) : (
            <Maximize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          )}
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
