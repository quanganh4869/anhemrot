const fs = require('fs');
const xml = fs.readFileSync('extracted_slides/content.xml', 'utf8');

// Strip out notes completely before processing
const strippedXml = xml.replace(/<presentation:notes[\s\S]*?<\/presentation:notes>/g, '');

const pages = strippedXml.split('<draw:page');
const scenes = [];

for (let i = 1; i < pages.length; i++) {
  const page = pages[i];
  
  // Get all images on this slide
  const imgRegex = /xlink:href="Pictures\/([^"]+)"/g;
  let match;
  const images = [];
  while ((match = imgRegex.exec(page)) !== null) {
    images.push(match[1]);
  }
  
  // Filter duplicates
  const uniqueImages = [...new Set(images)];
  
  // Get text on this slide
  const textMatches = page.match(/<text:p[^>]*>(.*?)<\/text:p>/g);
  let text = [];
  if (textMatches) {
    textMatches.forEach(m => {
      const clean = m.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      if (clean) text.push(clean);
    });
  }
  
  if (uniqueImages.length > 0 || text.length > 0) {
    scenes.push({
      images: uniqueImages,
      text: text
    });
  }
}

console.log(JSON.stringify(scenes, null, 2));
