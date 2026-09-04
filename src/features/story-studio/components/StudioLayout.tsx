"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface StudioLayoutProps {
  header: React.ReactNode;
  sidebarLeft: React.ReactNode;
  sidebarRight: React.ReactNode;
  timeline: React.ReactNode;
  canvas: React.ReactNode;
}

export default function StudioLayout({
  header,
  sidebarLeft,
  sidebarRight,
  timeline,
  canvas,
}: StudioLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 bg-zinc-900/50 backdrop-blur-md">
        {header}
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Scenes) */}
        <aside className="w-64 border-r border-zinc-800 bg-zinc-900/30 flex flex-col shrink-0">
          {sidebarLeft}
        </aside>

        {/* Center Area */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-zinc-950">
          {/* Canvas area (Live Preview) */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
            {canvas}
          </div>
          
          {/* Timeline area */}
          <div className="h-48 border-t border-zinc-800 bg-zinc-900/50 shrink-0">
            {timeline}
          </div>
        </main>

        {/* Right Sidebar (Properties) */}
        <aside className="w-72 border-l border-zinc-800 bg-zinc-900/30 flex flex-col shrink-0 overflow-y-auto">
          {sidebarRight}
        </aside>
      </div>
    </div>
  );
}
