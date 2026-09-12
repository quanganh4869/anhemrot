import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface AtmosphericEffectProps {
  type?: string;
  className?: string;
}

export default function AtmosphericEffect({ type = "floating_lights", className }: AtmosphericEffectProps) {
  // Generate deterministic particles so SSR and client hydration match
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 17 + 13) % 96}%`,
      top: `${(i * 23 + 7) % 94}%`,
      size: (i % 3) + 2, // 2px to 4px
      duration: 6 + (i % 5) * 2, // 6s - 14s
      delay: (i % 7) * 0.8,
      opacity: 0.3 + ((i % 5) * 0.15), // 0.3 to 0.9
      blur: (i % 2 === 0) ? "blur-[0.5px]" : "blur-[1px]",
      color: (i % 4 === 0) ? "bg-amber-200" : (i % 3 === 0) ? "bg-cyan-200" : "bg-white"
    }));
  }, []);

  if (type === "mist" || type === "fog") {
    return (
      <div className={cn("w-full h-full pointer-events-none relative overflow-hidden", className)}>
        {/* Soft ethereal ambient mist */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/10 via-white/[0.03] to-transparent pointer-events-none" />
      </div>
    );
  }

  if (type === "vignette") {
    return (
      <div className={cn("w-full h-full pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_45%,_rgba(0,0,0,0.75)_100%)]", className)} />
    );
  }

  if (type === "embers" || type === "stardust") {
    return (
      <div className={cn("w-full h-full pointer-events-none relative overflow-hidden", className)}>
        {particles.map((p) => (
          <div
            key={p.id}
            className={cn("absolute rounded-full pointer-events-none shadow-[0_0_8px_rgba(255,215,0,0.8)]", p.blur, p.color)}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>
    );
  }

  // Default: floating_lights (dreamy light motes with soft glow)
  return (
    <div className={cn("w-full h-full pointer-events-none relative overflow-hidden", className)}>
      {/* Ambient cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.65)_100%)]" />

      {/* Floating light motes */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={cn(
            "absolute rounded-full pointer-events-none transition-all",
            p.color,
            p.blur,
            "shadow-[0_0_12px_rgba(255,255,255,0.9)]"
          )}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size + 1}px`,
            height: `${p.size + 1}px`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
