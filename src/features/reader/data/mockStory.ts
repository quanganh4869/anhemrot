import { StoryConfig, SceneConfig } from "../types";

export const mockStoryData: StoryConfig = {
  id: "nightmare-dream",
  title: "A Nightmare That Wanted To Become A Beautiful Dream",
  chapters: [
    {
      id: "chapter-1",
      title: "Chương 1: Khởi Sinh Giữa Hai Thế Giới",
      scenes: [
        // Scene 1: Prologue
        {
          id: "scene-1-prologue",
          order: 1,
          scrollDuration: "220vh",
          pin: true,
          scrub: 1,
          layers: [
            {
              id: "s1-bg",
              type: "background",
              assetUrl: "/images/story/scene_01_intro.webp",
              zIndex: 1,
              x: 0, y: 0, width: "100%", height: "100%",
              transformOrigin: "center center",
              animations: [
                {
                  id: "s1-bg-zoom",
                  property: "scale",
                  from: { scale: 1.0 },
                  to: { scale: 1.12 },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "power1.out"
                }
              ]
            },
            {
              id: "s1-fx-lights",
              type: "effect",
              content: "floating_lights",
              zIndex: 10,
              animations: [
                {
                  id: "s1-fx-move",
                  property: "translateY",
                  from: { value: "0%" },
                  to: { value: "-25%" },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "none"
                },
                {
                  id: "s1-fx-fade",
                  property: "opacity",
                  from: { value: 0.3 },
                  to: { value: 1 },
                  startProgress: 0.1,
                  endProgress: 0.5
                }
              ]
            },
            {
              id: "s1-narr-1",
              type: "narration",
              content: "Thuở sơ khai, khi giấc mơ chưa có tên gọi, bóng tối và ánh sáng vẫn đan xen làm một...",
              zIndex: 20,
              x: "8%", y: "15%",
              animations: [
                {
                  id: "s1-n1-in",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.15,
                  endProgress: 0.35
                },
                {
                  id: "s1-n1-out",
                  property: "opacity",
                  from: { value: 1 },
                  to: { value: 0 },
                  startProgress: 0.65,
                  endProgress: 0.85
                }
              ]
            }
          ]
        },

        // Scene 2: The Title & Awakening
        {
          id: "scene-2-awakening",
          order: 2,
          scrollDuration: "250vh",
          pin: true,
          scrub: 1,
          backgroundColor: "#ffffff",
          layers: [
            {
              id: "s2-bg",
              type: "background",
              assetUrl: "/images/story/scene_02_title.webp",
              zIndex: 1,
              x: 0, y: 0, width: "100%", height: "100%",
              transformOrigin: "center center",
              animations: [
                {
                  id: "s2-bg-pan",
                  property: "translateY",
                  from: { value: "0%" },
                  to: { value: "-4%" },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "none"
                }
              ]
            },
            {
              id: "s2-fx-stardust",
              type: "effect",
              content: "stardust",
              zIndex: 10,
              animations: [
                {
                  id: "s2-star-lift",
                  property: "translateY",
                  from: { value: "10%" },
                  to: { value: "-40%" },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "none"
                }
              ]
            },
            {
              id: "s2-narr",
              type: "narration",
              content: "Một sinh linh nhỏ bé cất tiếng khóc đầu tiên giữa ranh giới của cõi mộng...",
              zIndex: 25,
              x: "10%", y: "75%",
              className: "!text-zinc-800 drop-shadow-none font-medium",
              animations: [
                {
                  id: "s2-n-fade",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.35,
                  endProgress: 0.55
                },
                {
                  id: "s2-n-out",
                  property: "opacity",
                  from: { value: 1 },
                  to: { value: 0 },
                  startProgress: 0.75,
                  endProgress: 0.9
                }
              ]
            }
          ]
        },

        // Scene 3: Council of Deities
        {
          id: "scene-3-deities",
          order: 3,
          scrollDuration: "280vh",
          pin: true,
          scrub: 1,
          layers: [
            {
              id: "s3-bg",
              type: "background",
              assetUrl: "/images/story/scene_03_deities.webp",
              zIndex: 1,
              x: 0, y: 0, width: "100%", height: "100%",
              transformOrigin: "center center",
              animations: [
                {
                  id: "s3-bg-pan",
                  property: "translateX",
                  from: { value: "-3%" },
                  to: { value: "3%" },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "none"
                },
                {
                  id: "s3-bg-zoom",
                  property: "scale",
                  from: { scale: 1.08 },
                  to: { scale: 1.0 },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "power1.out"
                }
              ]
            },
            {
              id: "s3-fx-vignette",
              type: "effect",
              content: "vignette",
              zIndex: 8,
            },
            {
              id: "s3-fg-lights",
              type: "foreground",
              content: "floating_lights",
              zIndex: 15,
              animations: [
                {
                  id: "s3-fg-parallax",
                  property: "translateY",
                  from: { value: "20%" },
                  to: { value: "-50%" },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "none"
                }
              ]
            },
            {
              id: "s3-d1",
              type: "dialogue",
              content: "\"Ngươi là ác mộng sinh ra từ bóng tối. Nơi chốn thần thánh này không có chỗ cho ngươi.\"",
              zIndex: 20,
              x: "8%", y: "25%",
              animations: [
                {
                  id: "s3-d1-in",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.2,
                  endProgress: 0.35
                },
                {
                  id: "s3-d1-out",
                  property: "opacity",
                  from: { value: 1 },
                  to: { value: 0 },
                  startProgress: 0.48,
                  endProgress: 0.58
                }
              ]
            },
            {
              id: "s3-d2",
              type: "dialogue",
              content: "\"Nhưng con cũng có trái tim... con cũng ước ao mang lại nụ cười như họ...\"",
              zIndex: 20,
              x: "12%", y: "60%",
              animations: [
                {
                  id: "s3-d2-in",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.6,
                  endProgress: 0.75
                },
                {
                  id: "s3-d2-out",
                  property: "opacity",
                  from: { value: 1 },
                  to: { value: 0 },
                  startProgress: 0.88,
                  endProgress: 0.98
                }
              ]
            }
          ]
        },

        // Scene 4: Cast into Chaos
        {
          id: "scene-4-chaos",
          order: 4,
          scrollDuration: "240vh",
          pin: true,
          scrub: 1,
          layers: [
            {
              id: "s4-bg",
              type: "background",
              assetUrl: "/images/story/scene_08_chaos.webp",
              zIndex: 1,
              x: 0, y: 0, width: "100%", height: "100%",
              transformOrigin: "center center",
              animations: [
                {
                  id: "s4-bg-zoom",
                  property: "scale",
                  from: { scale: 1.0 },
                  to: { scale: 1.15 },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "power2.inOut"
                }
              ]
            },
            {
              id: "s4-narr",
              type: "narration",
              content: "Bị xua đuổi khỏi đền thờ, linh hồn nhỏ bé rơi tự do vào cõi hỗn mang cuồng nộ...",
              zIndex: 20,
              x: "8%", y: "45%",
              animations: [
                {
                  id: "s4-n-in",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.2,
                  endProgress: 0.4
                },
                {
                  id: "s4-n-out",
                  property: "opacity",
                  from: { value: 1 },
                  to: { value: 0 },
                  startProgress: 0.7,
                  endProgress: 0.9
                }
              ]
            }
          ]
        },

        // Scene 5: The Pond of Still Waters
        {
          id: "scene-5-pond",
          order: 5,
          scrollDuration: "260vh",
          pin: true,
          scrub: 1,
          layers: [
            {
              id: "s5-bg",
              type: "background",
              assetUrl: "/images/story/scene_09_pond.webp",
              zIndex: 1,
              x: 0, y: 0, width: "100%", height: "100%",
              transformOrigin: "center center",
              animations: [
                {
                  id: "s5-bg-pan",
                  property: "translateY",
                  from: { value: "3%" },
                  to: { value: "-3%" },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "none"
                }
              ]
            },
            {
              id: "s5-fx-lights",
              type: "effect",
              content: "floating_lights",
              zIndex: 10,
              animations: [
                {
                  id: "s5-lights-drift",
                  property: "translateY",
                  from: { value: "10%" },
                  to: { value: "-40%" },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "none"
                }
              ]
            },
            {
              id: "s5-narr",
              type: "narration",
              content: "Dưới đáy vực sâu, một mặt hồ tĩnh lặng soi bóng sự cô độc...",
              zIndex: 20,
              x: "8%", y: "20%",
              animations: [
                {
                  id: "s5-n-in",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.15,
                  endProgress: 0.35
                },
                {
                  id: "s5-n-out",
                  property: "opacity",
                  from: { value: 1 },
                  to: { value: 0 },
                  startProgress: 0.45,
                  endProgress: 0.55
                }
              ]
            },
            {
              id: "s5-d1",
              type: "dialogue",
              content: "\"Nếu không ai ban tặng cho ta một giấc mơ, ta sẽ tự gom nhặt những tia sáng để thêu dệt nên nó.\"",
              zIndex: 20,
              x: "10%", y: "55%",
              animations: [
                {
                  id: "s5-d-in",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.55,
                  endProgress: 0.75
                },
                {
                  id: "s5-d-out",
                  property: "opacity",
                  from: { value: 1 },
                  to: { value: 0 },
                  startProgress: 0.85,
                  endProgress: 0.95
                }
              ]
            }
          ]
        },

        // Scene 6: The Warm Embrace
        {
          id: "scene-6-embrace",
          order: 6,
          scrollDuration: "260vh",
          pin: true,
          scrub: 1,
          layers: [
            {
              id: "s6-bg",
              type: "background",
              assetUrl: "/images/story/scene_14_embrace.webp",
              zIndex: 1,
              x: 0, y: 0, width: "100%", height: "100%",
              transformOrigin: "center center",
              animations: [
                {
                  id: "s6-bg-zoom",
                  property: "scale",
                  from: { scale: 1.0 },
                  to: { scale: 1.08 },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "power1.out"
                }
              ]
            },
            {
              id: "s6-narr",
              type: "narration",
              content: "Tình thương chưa bao giờ phân biệt ngày hay đêm, ác mộng hay giấc mộng vàng.",
              zIndex: 20,
              x: "8%", y: "20%",
              animations: [
                {
                  id: "s6-n-in",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.15,
                  endProgress: 0.35
                },
                {
                  id: "s6-n-out",
                  property: "opacity",
                  from: { value: 1 },
                  to: { value: 0 },
                  startProgress: 0.5,
                  endProgress: 0.6
                }
              ]
            },
            {
              id: "s6-d",
              type: "dialogue",
              content: "\"Đừng sợ hãi nữa... bé con đã tìm thấy mái nhà của mình rồi.\"",
              zIndex: 20,
              x: "10%", y: "65%",
              animations: [
                {
                  id: "s6-d-in",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.55,
                  endProgress: 0.75
                },
                {
                  id: "s6-d-out",
                  property: "opacity",
                  from: { value: 1 },
                  to: { value: 0 },
                  startProgress: 0.88,
                  endProgress: 0.98
                }
              ]
            }
          ]
        },

        // Scene 7: Golden Butterfly & Rebirth
        {
          id: "scene-7-rebirth",
          order: 7,
          scrollDuration: "250vh",
          pin: true,
          scrub: 1,
          layers: [
            {
              id: "s7-bg",
              type: "background",
              assetUrl: "/images/story/scene_16_butterfly.webp",
              zIndex: 1,
              x: 0, y: 0, width: "100%", height: "100%",
              transformOrigin: "center center",
              animations: [
                {
                  id: "s7-bg-pan",
                  property: "translateY",
                  from: { value: "4%" },
                  to: { value: "-4%" },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "none"
                }
              ]
            },
            {
              id: "s7-fx-lights",
              type: "effect",
              content: "floating_lights",
              zIndex: 10,
              animations: [
                {
                  id: "s7-lights-soar",
                  property: "translateY",
                  from: { value: "30%" },
                  to: { value: "-60%" },
                  startProgress: 0,
                  endProgress: 1,
                  ease: "none"
                }
              ]
            },
            {
              id: "s7-narr",
              type: "narration",
              content: "Và từ tro tàn của sự cô độc, một đôi cánh vàng rực rỡ đã vút bay giữa muôn ngàn tinh tú.",
              zIndex: 20,
              x: "8%", y: "25%",
              animations: [
                {
                  id: "s7-n-in",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.15,
                  endProgress: 0.35
                },
                {
                  id: "s7-n-out",
                  property: "opacity",
                  from: { value: 1 },
                  to: { value: 0 },
                  startProgress: 0.5,
                  endProgress: 0.6
                }
              ]
            },
            {
              id: "s7-title",
              type: "ui",
              content: "Cơn ác mộng ngày ấy... giờ đã hóa thành giấc mơ đẹp nhất.",
              zIndex: 20,
              x: "5%", y: "55%", width: "90%",
              animations: [
                {
                  id: "s7-t-in",
                  property: "opacity",
                  from: { value: 0 },
                  to: { value: 1 },
                  startProgress: 0.6,
                  endProgress: 0.8
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
