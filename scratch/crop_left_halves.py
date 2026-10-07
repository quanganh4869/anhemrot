import cv2

f24 = cv2.imread('scratch/slides_24_27/f_124.5s.jpg')
f25 = cv2.imread('scratch/slides_24_27/f_130.0s.jpg')

# Crop the left half of both frames
h, w, _ = f24.shape
cv2.imwrite('scratch/slides_24_27/left_half_s24.jpg', f24[:, :int(w*0.65)])
cv2.imwrite('scratch/slides_24_27/left_half_s25.jpg', f25[:, :int(w*0.65)])
print('Saved left halves')
