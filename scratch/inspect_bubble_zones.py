import cv2, numpy as np

# Load 1280x720 video frames
f24 = cv2.imread('scratch/slides_24_27/orig_frame_124.5s.png')
f25 = cv2.imread('scratch/slides_24_27/orig_frame_130.0s.png')

# Let's inspect the speech bubble in f24 and f25
# The speech bubble interior is #FFFFFF (pure white 255,255,255 or near white > 240)
# The text inside is magenta/pink: #DE007B (R~220, G~0, B~120)
# The border is magenta/pink: #DE007B (thickness ~3-4px)
# Everything outside the border is either:
# - dark blue background (#1a0d2e or similar)
# - cradle wood / blanket (#D8C6A5, #C63625)
# - white outer margin of cradle / baby

# Let's inspect the exact crop area:
# In 1280x720:
# For s24:
# Left: 0 to 600
# Top: 200 to 720
crop24 = f24[200:720, 0:600]
cv2.imwrite('scratch/slides_24_27/s24_bubble_zone.png', crop24)

# For s25:
# Left: 0 to 600
# Top: 300 to 720
crop25 = f25[300:720, 0:600]
cv2.imwrite('scratch/slides_24_27/s25_bubble_zone.png', crop25)
print('Saved bubble zones')
