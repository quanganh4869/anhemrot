import re

with open('extracted_slides/styles.xml', 'r', encoding='utf-8') as f:
    text = f.read()

for m in re.finditer(r'<style:page-layout-properties\b[^>]*>', text):
    print(m.group(0))
