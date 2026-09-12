"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Handle user interaction to bypass autoplay policy
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(() => { /* silent catch */ });
      }
    };

    // Listen for any interaction
    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("scroll", handleUserInteraction, { once: true });
    window.addEventListener("keydown", handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("[Audio] Autoplay or playback blocked:", err);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end">
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/OpeningAnimee.wav"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Music Toggle Button */}
      <button
        onClick={toggleMute}
        className="w-12 h-12 bg-zinc-900/80 backdrop-blur border border-zinc-700 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-zinc-800 transition-all hover:scale-110 active:scale-95 group relative"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-green-400 group-hover:text-green-300" />
        ) : (
          <VolumeX className="w-5 h-5 text-red-400 group-hover:text-red-300" />
        )}
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-zinc-900 px-2 py-1 text-xs rounded text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-zinc-800">
          {isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        </span>
      </button>

      {/* Placeholder for Chatbot button (for future integration) */}
      {/* 
      <button className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-xl hover:bg-blue-600 transition-all">
        <MessageCircle className="w-6 h-6 text-white" />
      </button> 
      */}
    </div>
  );
}
