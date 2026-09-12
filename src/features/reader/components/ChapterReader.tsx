import React from "react";
import { ChapterConfig } from "../types";
import SceneRenderer from "./SceneRenderer";

interface ChapterReaderProps {
  chapter: ChapterConfig;
}

export default function ChapterReader({ chapter }: ChapterReaderProps) {
  return (
    <div className="w-full flex flex-col items-center bg-black">
      {chapter.scenes.map((scene) => (
        <SceneRenderer key={scene.id} scene={scene} />
      ))}
    </div>
  );
}
