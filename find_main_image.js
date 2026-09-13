const fs = require('fs');
const xml = fs.readFileSync('extracted_slides/content.xml', 'utf8');

const pages = xml.split('<draw:page');
const results = [];

for (let i = 1; i < pages.length; i++) {
  const pageContent = pages[i];
  if (pageContent.includes('presentation:class="notes"')) continue;
  
  const regex = /xlink:href="Pictures\/([^"]+)"/g;
  let match;
  let largestImage = null;
  let maxSize = 0;
  let allImages = [];
  
  while ((match = regex.exec(pageContent)) !== null) {
    const file = match[1];
    allImages.push(file);
    try {
      const stats = fs.statSync(`extracted_slides/Pictures/${file}`);
      if (stats.size > maxSize) {
        maxSize = stats.size;
        largestImage = file;
      }
    } catch(e) {}
  }
  
  const text = pageContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length > 5 || largestImage) {
    results.push({
      text: text.substring(0, 50),
      mainImage: largestImage,
      allImages: allImages
    });
  }
}

console.log(JSON.stringify(results, null, 2));
