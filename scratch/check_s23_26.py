import re

with open('frontend/src/data/slidesData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

slides = text.split('slideNumber:')
for s in [23, 24, 25, 26]:
    for part in slides:
        m = re.match(r'^\s*' + str(s) + r'\b', part)
        if m:
            print(f"=== SLIDE {s} ===")
            for line in part.split('\n'):
                if 'name:' in line or 'media:' in line:
                    print("  ", line.strip())
