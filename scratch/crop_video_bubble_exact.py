import cv2, numpy as np

f24 = cv2.imread('scratch/slides_24_27/f_124.5s.jpg')
f25 = cv2.imread('scratch/slides_24_27/f_130.0s.jpg')

# Let's crop x: 0 to 520, y: 200 to 540 in 960x540
b24 = f24[180:540, 0:540]
b25 = f25[180:540, 0:540]

cv2.imwrite('scratch/slides_24_27/comp_bubble_24.jpg', b24)
cv2.imwrite('scratch/slides_24_27/comp_bubble_25.jpg', b25)
print('Saved comp_bubble_24 and comp_bubble_25')
