import re

with open('extracted_slides/content.xml', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's search for pages containing the text of slides 23, 24, 25, 26
pages = text.split('<draw:page')
print(f"Total pages: {len(pages)}")

for i, page in enumerate(pages):
    for kw_idx, keyword in enumerate(['Nguoi la ai', 'Trong the gioi', 'doi bao nhieu bai', 'Chiu thua truoc']):
        kw_unicode = ['Ng\u01b0\u1eddi l\u00e0 ai', 'Trong th\u1ebf gi\u1edbi', '\u0111\u1ed5i bao nhi\u00eau b\u00e0i', 'Ch\u1ecbu thua tr\u01b0\u1edbc'][kw_idx]
        if kw_unicode in page:
            print(f"\n--- Page {i} matches '{keyword}' ---")
            # find all draw elements with coords
            shapes = re.findall(r'<draw:(custom-shape|frame|image|text-box)\b[^>]*>', page)
            for m in re.finditer(r'<draw:([a-z-]+)\b([^>]*)>', page):
                tag, attrs = m.group(1), m.group(2)
                name = re.search(r'draw:name="([^"]+)"', attrs)
                w = re.search(r'svg:width="([^"]+)"', attrs)
                h = re.search(r'svg:height="([^"]+)"', attrs)
                x = re.search(r'svg:x="([^"]+)"', attrs)
                y = re.search(r'svg:y="([^"]+)"', attrs)
                if w and h:
                    print(f"  {tag}: name={name.group(1) if name else '?'} x={x.group(1) if x else 0} y={y.group(1) if y else 0} w={w.group(1)} h={h.group(1)}")
