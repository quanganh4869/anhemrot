const fs = require('fs');
const xml = fs.readFileSync('extracted_slides/content.xml', 'utf8');
const strippedXml = xml.replace(/<presentation:notes[\s\S]*?<\/presentation:notes>/g, '');
const pages = strippedXml.split('<draw:page');
for (let i = 1; i < pages.length; i++) {
  const p = pages[i];
  const nameMatch = p.match(/draw:name="([^"]+)"/);
  const textMatches = p.match(/<text:p[^>]*>(.*?)<\/text:p>/g) || [];
  const texts = textMatches.map(m => m.replace(/<[^>]*>/g, '').trim()).filter(Boolean);
  const imgs = [...new Set([...p.matchAll(/xlink:href="Pictures\/([^"]+)"/g)].map(m => m[1]))];
  console.log(`Page ${i} (${nameMatch ? nameMatch[1] : ''}): ${imgs.length} images: ${imgs.join(', ')}`);
  if (texts.length) {
    console.log(`   Texts: ${texts.slice(0, 3).join(' | ').substring(0, 120)}`);
  }
}
