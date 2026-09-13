const fs = require('fs');
const xml = fs.readFileSync('extracted_slides/content.xml', 'utf8');

const pages = xml.split('<draw:page');
const results = [];

for (let i = 1; i < pages.length; i++) {
  const pageContent = pages[i];
  const regex = /xlink:href="Pictures\/([^"]+)"/g;
  let match;
  let largestImage = null;
  let maxSize = 0;
  
  while ((match = regex.exec(pageContent)) !== null) {
    const file = match[1];
    try {
      const stats = fs.statSync(`extracted_slides/Pictures/${file}`);
      if (stats.size > maxSize) {
        maxSize = stats.size;
        largestImage = file;
      }
    } catch(e) {}
  }
  
  const text = pageContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (largestImage) {
    results.push({
      slideIndex: i,
      text: text.substring(0, 100),
      mainImage: largestImage
    });
  }
}

console.log(JSON.stringify(results, null, 2));
