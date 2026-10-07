import sys, xml.etree.ElementTree as ET
sys.stdout.reconfigure(encoding='utf-8')

tree = ET.parse('extracted_slides/content.xml')
root = tree.getroot()

# Find all custom-shape elements
shapes = root.findall('.//{urn:oasis:names:tc:opendocument:xmlns:drawing:1.0}custom-shape')
print('Found custom shapes:', len(shapes))
for s in shapes:
    name = s.attrib.get('{urn:oasis:names:tc:opendocument:xmlns:drawing:1.0}name', '')
    txt = ' '.join([e.text for e in s.iter() if e.text and e.text.strip()])
    if 'Trong thế giới' in txt or 'Dù Ác Mộng' in txt:
        print(f'Shape {name}:')
        print('  attribs:', s.attrib)
        # find enhanced-geometry
        geom = s.find('{urn:oasis:names:tc:opendocument:xmlns:drawing:1.0}enhanced-geometry')
        if geom is not None:
            print('  geom attribs:', geom.attrib)
            for k, v in geom.attrib.items():
                print(f'    {k}: {v}')
