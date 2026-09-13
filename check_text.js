const fs = require('fs');
const xml = fs.readFileSync('extracted_slides/content.xml', 'utf8');
const pages = xml.split('<draw:page');
for (let i = 1; i < pages.length; i++) {
  // Extract all text inside text boxes
  const textMatches = pages[i].match(/<text:p[^>]*>(.*?)<\/text:p>/g);
  let text = '';
  if (textMatches) {
    text = textMatches.map(m => m.replace(/<[^>]*>/g, ' ')).join(' ').replace(/\s+/g, ' ').trim();
  }
  
  // Also get the main image
  const regex = /xlink:href="Pictures\/([^"]+)"/g;
  let match;
  let largestImage = null;
  let maxSize = 0;
  while ((match = regex.exec(pages[i])) !== null) {
    const file = match[1];
    try {
      const stats = fs.statSync(`extracted_slides/Pictures/${file}`);
      if (stats.size > maxSize) { maxSize = stats.size; largestImage = file; }
    } catch(e) {}
  }

  if (text || largestImage) {
    console.log(`\n--- Page ${i} ---`);
    console.log(`Image: ${largestImage}`);
    console.log(`Text: ${text.substring(0, 200)}`);
  }
}
