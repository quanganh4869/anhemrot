import re

with open('extracted_slides/content.xml', 'r', encoding='utf-8') as f:
    text = f.read()

# strip notes
stripped = re.sub(r'<presentation:notes[\s\S]*?<\/presentation:notes>', '', text)
pages = stripped.split('<draw:page')[1:]

print(f"Total pages in content.xml: {len(pages)}")

for idx, page in enumerate(pages, 1):
    texts = re.findall(r'<text:p[^>]*>(.*?)<\/text:p>', page)
    clean_texts = []
    for t in texts:
        c = re.sub(r'<[^>]*>', ' ', t).strip()
        c = re.sub(r'\s+', ' ', c)
        if c: clean_texts.append(c)
    imgs = re.findall(r'xlink:href="Pictures\/([^"]+)"', page)
    unique_imgs = list(dict.fromkeys(imgs))
    summary_text = ' // '.join(clean_texts)[:80]
    line = f"Page {idx:02d}: text({len(clean_texts)})='{summary_text}' imgs({len(unique_imgs)})={unique_imgs[:3]}"
    print(line.encode('ascii', errors='replace').decode('ascii'))
