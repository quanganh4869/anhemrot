import { storySlides } from '../frontend/src/data/slidesData';

// Slide 23 is index 22, Slide 24 is index 23, Slide 25 is index 24
console.log('Slide 23 (index 22):', storySlides[22]?.slideNumber, storySlides[22]?.id);
console.log('Slide 24 (index 23):', storySlides[23]?.slideNumber, storySlides[23]?.id);
console.log('Slide 25 (index 24):', storySlides[24]?.slideNumber, storySlides[24]?.id);

console.log('\n--- SLIDE 24 ELEMENTS ---');
storySlides[23]?.elements.forEach((el, i) => {
  console.log(`[${i}] ${el.name} | media=${el.media} | role=${el.role} | left=${el.left}% top=${el.top}% w=${el.width}% h=${el.height}% zIndex=${el.zIndex} opacity=${el.opacity}`);
});

console.log('\n--- SLIDE 23 ELEMENTS ---');
storySlides[22]?.elements.forEach((el, i) => {
  console.log(`[${i}] ${el.name} | media=${el.media} | role=${el.role} | left=${el.left}% top=${el.top}% w=${el.width}% h=${el.height}% zIndex=${el.zIndex} opacity=${el.opacity}`);
});
