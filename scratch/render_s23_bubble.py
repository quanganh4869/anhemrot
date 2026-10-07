import urllib.request, os
from PIL import Image, ImageDraw, ImageFont

# 1. Download Montserrat font from Google Fonts GitHub repo if not already cached
font_path = 'scratch/Montserrat-Medium.ttf'
if not os.path.exists(font_path):
    url = 'https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat-Medium.ttf'
    print('Downloading font...')
    urllib.request.urlretrieve(url, font_path)
    print('Font downloaded')

# 2. Load blank cloud template
blank = Image.open('scratch/slides_24_27/blank_cloud.png').convert('RGBA')
w, h = blank.size # 765, 541

# 3. Text to draw for Slide 23:
# In video:
# "Được một thời gian,"
# "một hôm em bé"
# "chợt cất tiếng:"
# "“Người là ai vậy?”."
lines = [
    "Được một thời gian,",
    "một hôm em bé",
    "chợt cất tiếng:",
    "“Người là ai vậy?”."
]

# Font size and color:
# Video text color is #DE007B (RGB: 222, 0, 123)
color = (222, 0, 123, 255)
font_size = 28
font = ImageFont.truetype(font_path, font_size)

draw = ImageDraw.Draw(blank)

# In im24, the text center is roughly x = 380, y = 350
# Let's calculate total height of text block
line_height = int(font_size * 1.35)
total_text_h = len(lines) * line_height

start_y = 280
for i, line in enumerate(lines):
    # Center text horizontally around x = 380
    bbox = font.getbbox(line)
    lw = bbox[2] - bbox[0]
    lx = 380 - lw // 2
    ly = start_y + i * line_height
    draw.text((lx, ly), line, font=font, fill=color)

# Save output
out_path = 'frontend/public/media/cloud_callout_s23.png'
blank.save(out_path)
print('Saved cloud_callout_s23.png')

# Also save on white for inspection
bg = Image.new('RGB', blank.size, (255, 255, 255))
bg.paste(blank, mask=blank.split()[3])
bg.save('scratch/slides_24_27/new_s23_bubble_white.jpg')
print('Saved new_s23_bubble_white.jpg')
