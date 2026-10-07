import cv2, numpy as np

f24 = cv2.imread('scratch/slides_24_27/f_124.5s.jpg')
h, w, _ = f24.shape # 540, 960

# Let's find where the cloud bubble is in f24
# The cloud bubble has a pink outline: BGR approx [129, 0, 237]
# and white inside: [255, 255, 255]
# Let's find the bounding box of the cloud body and the tail bubbles
pink_pixels = (f24[:, :, 2] > 180) & (f24[:, :, 1] < 60) & (f24[:, :, 0] > 90)
# Look in left half (x < 600, y > 150)
mask = np.zeros((h, w), dtype=np.uint8)
mask[150:540, 0:600] = pink_pixels[150:540, 0:600]

# Find connected components or contours
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
boxes = [cv2.boundingRect(c) for c in contours if cv2.contourArea(c) > 50]

print('Found pink outline parts in s24:')
all_x = []
all_y = []
for bx, by, bw, bh in boxes:
    all_x.extend([bx, bx + bw])
    all_y.extend([by, by + bh])

if all_x and all_y:
    min_x, max_x = min(all_x), max(all_x)
    min_y, max_y = min(all_y), max(all_y)
    print(f'Total s24 bubble in video: x={min_x} ({min_x/w*100:.2f}%), y={min_y} ({min_y/h*100:.2f}%), w={max_x-min_x} ({(max_x-min_x)/w*100:.2f}%), h={max_y-min_y} ({(max_y-min_y)/h*100:.2f}%)')
    cv2.imwrite('scratch/slides_24_27/detected_s24_bubble_full.jpg', f24[min_y:max_y, min_x:max_x])
