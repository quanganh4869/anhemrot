import cv2, numpy as np

f24 = cv2.imread('scratch/slides_24_27/orig_frame_124.5s.png')
f25 = cv2.imread('scratch/slides_24_27/orig_frame_130.0s.png')
h, w, _ = f24.shape # 720, 1280

# Bubble is in lower left
# Let's crop x: 0 to int(w * 0.55), y: int(h * 0.35) to h
b24 = f24[int(h * 0.35):h, 0:int(w * 0.55)]
b25 = f25[int(h * 0.35):h, 0:int(w * 0.55)]

cv2.imwrite('scratch/slides_24_27/bubble24_720p.png', b24)
cv2.imwrite('scratch/slides_24_27/bubble25_720p.png', b25)
print('Saved bubble24_720p and bubble25_720p')
