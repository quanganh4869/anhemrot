import sys, xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')

tree = ET.parse('extracted_slides/content.xml')
root = tree.getroot()

pages = root.findall('.//{urn:oasis:names:tc:opendocument:xmlns:drawing:1.0}page')
print('Found pages:', len(pages))
for i, page in enumerate(pages):
    texts = [elem.text for elem in page.iter() if elem.text and elem.text.strip()]
    full = ' '.join(texts)
    if any(k in full for k in ['Trong thế giới', 'Dù Ác Mộng', 'Chịu thua', 'Được một thời gian']):
        print(f'=== Page {i+1} ===: {full[:80]}...')
        for shape in page:
            tag = shape.tag.split('}')[-1]
            name = shape.attrib.get('{urn:oasis:names:tc:opendocument:xmlns:drawing:1.0}name', '')
            txt = ' '.join([e.text for e in shape.iter() if e.text and e.text.strip()])
            x = shape.attrib.get('{urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0}x')
            y = shape.attrib.get('{urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0}y')
            w = shape.attrib.get('{urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0}width')
            h = shape.attrib.get('{urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0}height')
            print(f'  [{tag}] name={name} x={x} y={y} w={w} h={h} | txt={txt}')
