import Image from "next/image";

export interface StorySection {
  type: "paragraph" | "image";
  content?: string;
  src?: string;
  alt?: string;
}

interface StoryContentProps {
  sections: StorySection[];
}

export default function StoryContent({ sections }: StoryContentProps) {
  return (
    <div className="bg-background w-full py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="space-y-12">
          {sections.map((section, index) => {
            if (section.type === "paragraph") {
              return (
                <p 
                  key={index} 
                  className="font-sans text-xl sm:text-2xl text-foreground leading-relaxed md:leading-loose tracking-wide"
                >
                  {section.content}
                </p>
              );
            }
            if (section.type === "image" && section.src) {
              return (
                <div key={index} className="relative w-full aspect-[4/3] my-16 rounded-2xl overflow-hidden shadow-xl border-[8px] border-white ring-1 ring-gray-200">
                  <Image 
                    src={section.src}
                    alt={section.alt || "Story illustration"}
                    fill
                    className="object-cover"
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
