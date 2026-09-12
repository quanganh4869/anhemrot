import { StoryConfig, SceneConfig } from "../types";

const createScene1 = (): SceneConfig => ({
  id: "c1-s1",
  order: 1,
  scrollDuration: "200vh", // User must scroll 2 viewport heights to finish this scene
  layers: [
    {
      id: "bg-1",
      type: "background",
      assetUrl: "/images/story/scene_01_intro.webp",
      zIndex: 1,
      x: 0, y: 0, width: "100%", height: "100%",
      transformOrigin: "center center",
      animations: [
        {
          id: "a1", property: "scale",
          from: { scale: 1 }, to: { scale: 1.15 },
          startProgress: 0, endProgress: 1,
          ease: "none"
        }
      ]
    },
    {
      id: "txt-1",
      type: "dialogue",
      content: "Có một ác mộng muốn trở thành Một Giấc Mơ Đẹp...",
      zIndex: 10,
      x: "50%", y: "50%",
      className: "transform -translate-x-1/2 -translate-y-1/2 text-center max-w-lg",
      animations: [
        {
          id: "a2", property: "fade",
          from: { opacity: 0, y: 50 }, to: { opacity: 1, y: 0 },
          startProgress: 0.1, endProgress: 0.3
        },
        {
          id: "a3", property: "fade",
          from: { opacity: 1 }, to: { opacity: 0, y: -50 },
          startProgress: 0.7, endProgress: 0.9
        }
      ]
    }
  ]
});

const createScene2 = (): SceneConfig => ({
  id: "c1-s2",
  order: 2,
  scrollDuration: "250vh",
  layers: [
    {
      id: "bg-2",
      type: "background",
      assetUrl: "/images/story/scene_03_deities.webp",
      zIndex: 1,
      x: 0, y: 0, width: "100%", height: "100%",
      animations: [
        {
          id: "a1", property: "translate", // Pan left
          from: { x: "0%" }, to: { x: "-5%" },
          startProgress: 0, endProgress: 1
        }
      ]
    },
    {
      id: "txt-2",
      type: "dialogue",
      content: "Tại Thần Giới...",
      zIndex: 10,
      x: "10%", y: "20%",
      animations: [
        {
          id: "a2", property: "fade",
          from: { opacity: 0, filter: "blur(10px)" }, to: { opacity: 1, filter: "blur(0px)" },
          startProgress: 0, endProgress: 0.2
        }
      ]
    },
    {
      id: "txt-3",
      type: "dialogue",
      content: "Nó khóc nỉ non, van xin với các vị thần.",
      zIndex: 10,
      x: "60%", y: "70%",
      animations: [
        {
          id: "a3", property: "fade",
          from: { opacity: 0 }, to: { opacity: 1 },
          startProgress: 0.4, endProgress: 0.6
        }
      ]
    }
  ]
});

const createScene3 = (): SceneConfig => ({
  id: "c1-s3",
  order: 3,
  scrollDuration: "300vh",
  layers: [
    {
      id: "bg-3",
      type: "background",
      assetUrl: "/images/story/scene_05_blessings.webp",
      zIndex: 1,
      x: 0, y: 0, width: "100%", height: "100%",
      animations: [
        {
          id: "a1", property: "scale",
          from: { scale: 1.2 }, to: { scale: 1 },
          startProgress: 0, endProgress: 1
        }
      ]
    },
    {
      id: "txt-4",
      type: "dialogue",
      content: "Thần Bầu Trời gom những vì tinh tú lộng lẫy làm thành chiếc váy.",
      zIndex: 10,
      x: "50%", y: "30%",
      className: "transform -translate-x-1/2 w-full text-center",
      animations: [
        {
          id: "a2", property: "fade",
          from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 },
          startProgress: 0.1, endProgress: 0.3
        },
        {
          id: "a3", property: "fade",
          from: { opacity: 1 }, to: { opacity: 0 },
          startProgress: 0.4, endProgress: 0.5
        }
      ]
    },
    {
      id: "txt-5",
      type: "dialogue",
      content: "Thần Biển Cả gom những giọng hát du dương nhất...",
      zIndex: 10,
      x: "50%", y: "70%",
      className: "transform -translate-x-1/2 w-full text-center",
      animations: [
        {
          id: "a4", property: "fade",
          from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 },
          startProgress: 0.5, endProgress: 0.7
        }
      ]
    }
  ]
});

export const mockStoryData: StoryConfig = {
  id: "story-1",
  title: "Ác Mộng Và Giấc Mơ Đẹp",
  chapters: [
    {
      id: "chap-1",
      title: "Chương 1: Lời Thỉnh Cầu",
      scenes: [createScene1(), createScene2(), createScene3()]
    },
    {
      id: "chap-2",
      title: "Chương 2: Đứa Bé Khóc Nhè",
      scenes: [] // Dummy for now
    },
    {
      id: "chap-3",
      title: "Chương 3: Cánh Bướm",
      scenes: [] // Dummy for now
    }
  ]
};
