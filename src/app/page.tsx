"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StoryHero from "@/components/story/StoryHero";
import StoryContent, { StorySection } from "@/components/story/StoryContent";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Home() {
  const { language } = useLanguage();

  const storySectionsEN: StorySection[] = [
    {
      type: "paragraph",
      content: "Once upon a time, in a dense and magical forest, lived a tiny bug named Sparky. Sparky was a firefly, but there was one small problem. He didn't know how to shine his light.",
    },
    {
      type: "paragraph",
      content: "All of his friends would soar into the night sky, their tails glowing brightly like little stars dancing among the trees. Sparky would try with all his might, squeezing his eyes shut and wiggling his tail, but not even a flicker would appear.",
    },
    {
      type: "image",
      src: "/images/sad_firefly.png",
      alt: "Sparky looking sad because he cannot glow",
    },
    {
      type: "paragraph",
      content: "One evening, feeling very sad, Sparky sat on a large oak leaf while the others played 'Tag the Moon'. An old, wise moth named Barnaby landed gently beside him.",
    },
    {
      type: "paragraph",
      content: "'Why the gloomy face, little one?' asked Barnaby, his fuzzy antennae twitching.",
    },
    {
      type: "paragraph",
      content: "'I can't glow,' Sparky sighed. 'I want to light up the forest with my friends, but my light is broken.'",
    },
    {
      type: "paragraph",
      content: "Barnaby chuckled softly. 'Your light isn't broken, Sparky. You are just trying too hard to be like everyone else. Your light doesn't come from squeezing your eyes. It comes from the joy in your heart.'",
    },
    {
      type: "image",
      src: "/images/happy_firefly.png",
      alt: "Sparky finally lighting up the forest",
    },
    {
      type: "paragraph",
      content: "Sparky thought about this. He stopped trying to force his glow. Instead, he thought about his favorite things: the taste of sweet nectar, the soft evening breeze, and the laughter of his friends.",
    },
    {
      type: "paragraph",
      content: "Suddenly, he felt a warm, tickly feeling in his tummy. It grew warmer and brighter, until—POP! A brilliant, golden light burst from his tail! It was the brightest light the forest had ever seen.",
    },
    {
      type: "paragraph",
      content: "From that day on, Sparky never had trouble finding his light. He just had to remember what made him happy.",
    }
  ];

  const storySectionsVI: StorySection[] = [
    {
      type: "paragraph",
      content: "Ngày xửa ngày xưa, trong một khu rừng rậm rạp và kỳ diệu nọ, có một chú bọ nhỏ tên là Sparky. Sparky là một con đom đóm, nhưng cậu bé có một vấn đề nhỏ. Cậu không biết làm thế nào để phát sáng.",
    },
    {
      type: "paragraph",
      content: "Tất cả bạn bè của cậu đều có thể bay vút lên bầu trời đêm, chiếc đuôi của chúng phát sáng rực rỡ như những vì sao nhỏ đang khiêu vũ giữa các tán cây. Sparky cũng đã cố gắng hết sức, nhắm chặt mắt lại và lắc lư chiếc đuôi của mình, nhưng không có lấy một tia sáng nào léo lên.",
    },
    {
      type: "image",
      src: "/images/sad_firefly.png",
      alt: "Sparky trông thật buồn vì cậu bé không thể phát sáng",
    },
    {
      type: "paragraph",
      content: "Một buổi tối nọ, cảm thấy vô cùng buồn bã, Sparky ngồi trên một chiếc lá sồi lớn trong khi những con đom đóm khác đang chơi trò 'Đuổi Bắt Mặt Trăng'. Một bác bướm đêm già và thông thái tên là Barnaby nhẹ nhàng đậu xuống bên cạnh cậu.",
    },
    {
      type: "paragraph",
      content: "'Sao mặt cháu lại buồn thiu thế kia, cậu bé?' Bác Barnaby hỏi, đôi ăng-ten đầy lông của bác khẽ động đậy.",
    },
    {
      type: "paragraph",
      content: "'Cháu không thể phát sáng,' Sparky thở dài. 'Cháu muốn thắp sáng khu rừng cùng với các bạn, nhưng ánh sáng của cháu bị hỏng mất rồi.'",
    },
    {
      type: "paragraph",
      content: "Bác Barnaby cười khẽ. 'Ánh sáng của cháu không hề bị hỏng, Sparky. Cháu chỉ đang cố gắng quá sức để giống như những người khác thôi. Ánh sáng của cháu không đến từ việc cháu nhắm chặt đôi mắt. Nó bắt nguồn từ niềm vui trong trái tim cháu.'",
    },
    {
      type: "image",
      src: "/images/happy_firefly.png",
      alt: "Sparky cuối cùng cũng thắp sáng khu rừng",
    },
    {
      type: "paragraph",
      content: "Sparky trầm ngâm suy nghĩ về điều này. Cậu không cố ép bản thân phải phát sáng nữa. Thay vào đó, cậu nghĩ về những điều mà cậu thích nhất: hương vị của mật hoa ngọt ngào, làn gió buổi chiều tà dịu nhẹ, và tiếng cười rộn rã của những người bạn.",
    },
    {
      type: "paragraph",
      content: "Đột nhiên, cậu cảm thấy một thứ gì đó ấm áp và buồn buồn nhột nhột ở trong bụng. Nó lớn dần lên, ấm hơn và sáng hơn, cho đến khi... BÙM! Một tia sáng vàng rực rỡ lóe lên từ đuôi cậu! Đó là ánh sáng rực rỡ nhất mà khu rừng từng thấy.",
    },
    {
      type: "paragraph",
      content: "Kể từ ngày hôm đó, Sparky không bao giờ gặp khó khăn trong việc tìm lại ánh sáng của mình nữa. Cậu chỉ cần luôn nhớ về những điều khiến cậu cảm thấy vui vẻ và hạnh phúc.",
    }
  ];

  const activeSections = language === "en" ? storySectionsEN : storySectionsVI;

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <StoryHero 
          title={language === "en" ? "How Firefly Got His Light" : "Chú Đom Đóm Tìm Lại Ánh Sáng"}
          author="Daniel Errico"
          coverImage="/images/hero_firefly.png"
        />
        <StoryContent sections={activeSections} />
      </main>
      <Footer />
    </div>
  );
}
