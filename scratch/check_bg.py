import re

with open('frontend/src/data/slidesData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

slides = text.split('slideNumber:')
for s in slides[1:]:
    num = re.search(r'^\s*(\d+)', s)
    bg = re.search(r'bgColor:\s*[\'"]([^\'"]+)[\'"]', s)
    num_val = num.group(1) if num else '?'
    bg_val = bg.group(1) if bg else '?'
    # check textboxes
    textboxes = re.findall(r'type:\s*[\'"]textbox[\'"].*?text:\s*(\[[^\]]+\])', s, re.DOTALL)
    has_text = len(textboxes) > 0
    print(f"Slide {num_val}: bg={bg_val}, textboxes={len(textboxes)}")
