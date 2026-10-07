import re

with open('frontend/src/data/slidesData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

for m in re.finditer(r'slideNumber:\s*(\d+),\s*id:\s*[\'"]([^\'"]+)[\'"]', text):
    print(f"slideNumber: {m.group(1)}, id: {m.group(2)}")
