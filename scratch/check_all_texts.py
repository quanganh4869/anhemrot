import re

with open('frontend/src/data/slidesData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

slides = text.split('slideNumber:')
for s in slides[1:]:
    m_num = re.search(r'(\d+)', s)
    if not m_num: continue
    num = m_num.group(1)
    m_bg = re.search(r'bgColor:\s*[\'"]([^\'"]+)[\'"]', s)
    bg = m_bg.group(1) if m_bg else '?'
    # find all elements
    elems = s.split('id: \'el-')
    for el in elems[1:]:
        el_id = re.search(r'^([^\']+)', el).group(1)
        media = re.search(r'media:\s*([^\n,]+)', el)
        role = re.search(r'role:\s*\'([^\']+)\'', el)
        txt = re.search(r'text:\s*(\[[^\]]+\])', el)
        media_val = media.group(1).strip() if media else 'NONE'
        role_val = role.group(1) if role else '?'
        if txt and txt.group(1) != '[]':
            msg = f"Slide {num} ({bg}): el-{el_id}, media={media_val}, role={role_val}, text={txt.group(1)[:50]}"
            print(msg.encode('ascii', errors='replace').decode('ascii'))
