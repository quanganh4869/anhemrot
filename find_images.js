const fs = require('fs');
const xml = fs.readFileSync('extracted_slides/content.xml', 'utf8');

const pages = xml.split('<draw:page');
const slides = [];

for (let i = 1; i < pages.length; i++) {
  const pageContent = pages[i];
  
  // Extract images
  const regex = /xlink:href="Pictures\/([^"]+)"/g;
  let match;
  const images = [];
  while ((match = regex.exec(pageContent)) !== null) {
    images.push(match[1]);
  }
  
  // Extract text
  const text = pageContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  slides.push({
    slideIndex: i,
    images: images,
    textPreview: text.substring(0, 50)
  });
}

console.log(JSON.stringify(slides, null, 2));
