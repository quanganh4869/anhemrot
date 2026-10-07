import cv2, numpy as np, os

# Let's inspect the video frames vs what we would render
f24 = cv2.imread('scratch/slides_24_27/f_124.5s.jpg')
f25 = cv2.imread('scratch/slides_24_27/f_130.0s.jpg')

# Resize video frames to 1920x1080 if they are 960x540
if f24.shape[0] != 1080:
    f24 = cv2.resize(f24, (1920, 1080))
if f25.shape[0] != 1080:
    f25 = cv2.resize(f25, (1920, 1080))

cv2.imwrite('scratch/slides_24_27/vid_s24_1080.jpg', f24)
cv2.imwrite('scratch/slides_24_27/vid_s25_1080.jpg', f25)

print('Saved 1080p frames')
