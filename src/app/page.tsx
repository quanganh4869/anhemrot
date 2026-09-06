"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import ScrollStoryReader from "@/features/story-studio/components/ScrollStoryReader";
import { ChapterAnimConfig, Scene, AnimationPresetType } from "@/types/story-anim";

const ANIM_DURATION = 8;

const createScene = (id: string, order: number, img: string, animationPreset: AnimationPresetType, texts: string[]): Scene => {
  return {
    id,
    order,
    duration: ANIM_DURATION,
    status: "ready",
    aspectRatio: "16:9",
    background: {
      url: `/images/story/${img}`,
      animation: { preset: animationPreset, duration: ANIM_DURATION }
    },
    transition: { type: "crossfade", duration: 1 },
    layers: texts.map((text, i) => ({
      id: `${id}_text_${i}`,
      type: "text",
      content: text,
      x: 50, 
      y: 85 - (i * 10), 
      scale: 1, 
      rotation: 0, 
      opacity: 1, 
      zIndex: 10 + i,
      visible: true, 
      locked: false,
      fontSize: 28, 
      fontWeight: "medium", 
      textShadow: "2px 2px 8px rgba(0,0,0,1)",
      animation: { preset: "fadeUp", duration: 1.5, delay: 0.5 + (i * 0.8) }
    }))
  };
};

export default function Home() {
  const { language } = useLanguage();

  // "Có Một Ác Mộng" Scrollytelling Configuration
  const mockAnimatedStory: ChapterAnimConfig = {
    storyId: "nightmare-dream",
    chapterId: "1",
    status: "published",
    updatedAt: new Date().toISOString(),
    scenes: [
      createScene("s1", 0, "scene_01_intro.webp", "kenBurns", [
        language === "en" ? "A work by SAN ANH" : "MỘT TÁC PHẨM CỦA SAN ANH",
        language === "en" ? "Art & Illustration: MR. NGÀI" : "MỸ THUẬT & MINH HỌA: MR. NGÀI"
      ]),
      createScene("s2", 1, "scene_02_title.webp", "panLeft", [
        language === "en" ? "A nightmare that wanted to become" : "Có một ác mộng muốn trở thành",
        language === "en" ? "A BEAUTIFUL DREAM" : "MỘT GIẤC MƠ ĐẸP"
      ]),
      createScene("s3", 2, "scene_03_deities.webp", "panRight", [
        language === "en" ? "In the Realm of Gods..." : "Tại Thần Giới..."
      ]),
      createScene("s4", 3, "scene_04_pedestal.webp", "zoomIn", [
        language === "en" ? "It cried and begged the gods." : "Nó khóc nỉ non, van xin với các vị thần."
      ]),
      createScene("s5", 4, "scene_05_blessings.webp", "parallax", [
        language === "en" ? "The God of the Sky gathered the most dazzling stars to make a dress." : "Thần Bầu Trời gom những vì tinh tú lộng lẫy làm thành chiếc váy.",
        language === "en" ? "The God of the Sea gathered the sweetest songs..." : "Thần Biển Cả gom những giọng hát du dương nhất..."
      ]),
      createScene("s6", 5, "scene_06_floating.webp", "panLeft", [
        language === "en" ? "Three gods bestowed treasures and blessed its wish to come true." : "Ba vị thần ban bảo vật cho Ác Mộng và chúc phúc cho nguyện vọng của nó sẽ trở thành sự thật."
      ]),
      createScene("s7", 6, "scene_07_distress.webp", "fade", [
        language === "en" ? "The next morning, humans whispered about a sleepless night..." : "Sáng hôm sau, loài người kháo nhau về một đêm khó ngủ bởi mơ thấy ác mộng."
      ]),
      createScene("s8", 7, "scene_08_chaos.webp", "kenBurns", [
        language === "en" ? "Some dreamt of blinding lights, deafening sounds, and overwhelming scents." : "Có người mơ thấy ánh sáng chói lóa, âm thanh điếc tai, và mùi hương nồng nặc."
      ]),
      createScene("s9", 8, "scene_09_pond.webp", "zoomOut", [
        language === "en" ? "The Nightmare was desperate. It took off the treasures the gods had given it." : "Ác Mộng tuyệt vọng lắm, nó cởi bỏ các báu vật mà các vị thần đã ban cho."
      ]),
      createScene("s10", 9, "scene_10_hall.webp", "panRight", [
        language === "en" ? "Wandering the Dream Hall, it heard someone crying." : "Đang thất thểu đi trên Sảnh Giấc Mơ, nó nghe thấy văng vẳng tiếng ai đó khóc."
      ]),
      createScene("s11", 10, "scene_11_baby.webp", "parallax", [
        language === "en" ? "It followed the sound and found a baby crying in a crib." : "Nó tò mò lần la đi theo, thì ra là của một đứa bé nằm trong nôi khóc nhè."
      ]),
      createScene("s12", 11, "scene_12_lullaby.webp", "panLeft", [
        language === "en" ? "Unable to resist, the Nightmare began to sing a lullaby." : "Không kìm được lòng mình, Ác Mộng cất lên tiếng hát ru."
      ]),
      createScene("s13", 12, "scene_13_growing.webp", "kenBurns", [
        language === "en" ? "Time passed. One day, the baby suddenly asked: 'Who are you?'" : "Được một thời gian, một hôm em bé chợt cất tiếng: 'Người là ai vậy?'"
      ]),
      createScene("s14", 13, "scene_14_embrace.webp", "zoomIn", [
        language === "en" ? "Defeated by the baby, the Nightmare took a deep breath, expecting this to be the last time." : "Chịu thua trước em bé, Ác Mộng hít một hơi thật sâu, chuẩn bị tinh thần..."
      ]),
      createScene("s15", 14, "scene_15_dream.webp", "panRight", [
        language === "en" ? "But to its surprise, the baby smiled brightly and reached out to hug the Nightmare." : "Trái với dự liệu, em bé cười toe toét, hai tay giơ ra đòi ôm lấy Ác Mộng."
      ]),
      createScene("s16", 15, "scene_16_butterfly.webp", "parallax", [
        language === "en" ? "The Nightmare's shell began to crack, revealing beautiful butterfly wings." : "Vỏ ngoài của Ác Mộng nứt rạn, trước mắt em bé là đôi cánh bướm đủ màu sắc..."
      ]),
      createScene("s17", 16, "scene_17_credits.webp", "fade", [
        language === "en" ? "It had become a Beautiful Dream." : "Giờ đây đã trở thành một Giấc Mơ Đẹp."
      ])
    ]
  };

  // Override scene 2 title text style to make it huge
  mockAnimatedStory.scenes[1].layers[1].fontSize = 48;
  mockAnimatedStory.scenes[1].layers[1].fontWeight = "bold";

  return (
    <div className="bg-black text-white min-h-screen">
      {/* We hide the traditional Header and Footer to make it a fully immersive experience */}
      <main className="w-full h-full">
        {/* Scroll-based storytelling effect */}
        <ScrollStoryReader config={mockAnimatedStory} />
      </main>
    </div>
  );
}
