import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StoryHero from "@/components/story/StoryHero";
import StoryContent, { StorySection } from "@/components/story/StoryContent";

export default function Home() {
  const storySections: StorySection[] = [
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <StoryHero 
          title="How Firefly Got His Light"
          author="Daniel Errico"
          coverImage="/images/hero_firefly.png"
        />
        <StoryContent sections={storySections} />
      </main>
      <Footer />
    </div>
  );
}
