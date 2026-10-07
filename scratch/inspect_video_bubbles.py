import cv2

f24 = cv2.imread('scratch/slides_24_27/f_124.5s.jpg')
f25 = cv2.imread('scratch/slides_24_27/f_130.0s.jpg')

# Let's crop the text box region in both frames
# In 960x540:
# Save the exact text box regions
cv2.imwrite('scratch/slides_24_27/bubble24_from_video.jpg', f24[240:535, 10:560])
cv2.imwrite('scratch/slides_24_27/bubble25_from_video.jpg', f25[260:535, 10:540])

print('Saved video bubble crops')
