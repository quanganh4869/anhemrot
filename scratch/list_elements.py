import re

with open('frontend/src/data/slidesData.ts', 'r', encoding='utf-8') as f:
    code = f.read()

slides = code.split('slideNumber:')
for s in slides[1:]:
    num_match = re.search(r'^\s*(\d+)', s)
    if not num_match: continue
    num = int(num_match.group(1))
    if num in [22, 23, 24, 25, 26, 27]:
        print(f'=== SLIDE {num} ===')
        elems = s.split('{')
        for el in elems:
            if 'media:' in el or 'name:' in el:
                media_m = re.search(r"media:\s*'([^']+)'", el)
                name_m = re.search(r"name:\s*'([^']+)'", el)
                role_m = re.search(r"role:\s*'([^']+)'", el)
                left_m = re.search(r"left:\s*(-?[\d.]+)", el)
                top_m = re.search(r"top:\s*(-?[\d.]+)", el)
                w_m = re.search(r"width:\s*(-?[\d.]+)", el)
                h_m = re.search(r"height:\s*(-?[\d.]+)", el)
                name_str = name_m.group(1) if name_m else '?'
                media_str = media_m.group(1) if media_m else 'None'
                role_str = role_m.group(1) if role_m else '?'
                pos_str = f"left={left_m.group(1) if left_m else '?'}, top={top_m.group(1) if top_m else '?'}, w={w_m.group(1) if w_m else '?'}, h={h_m.group(1) if h_m else '?'}"
                print(f'  name={name_str}, media={media_str}, role={role_str}, {pos_str}')
