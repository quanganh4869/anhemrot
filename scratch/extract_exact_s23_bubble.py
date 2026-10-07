import cv2, numpy as np

f_with = cv2.imread('scratch/slides_24_27/orig_frame_119.0s.png')
f_without = cv2.imread('scratch/slides_24_27/orig_frame_117.0s.png')

h, w, _ = f_with.shape # 720, 1280

# In the bottom-left quadrant:
diff = cv2.absdiff(f_with, f_without)
diff_max = np.max(diff, axis=2)

# Where the bubble is: diff > 5
# The interior of the bubble is opaque white (or near white/pink text)
# Where diff > 15:
mask = np.zeros((h, w), dtype=np.uint8)
mask[200:720, 0:600] = (diff_max[200:720, 0:600] > 10).astype(np.uint8) * 255

# Fill holes inside the bubble
# Morphological close
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
mask_closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

# Find contours in the region
contours, _ = cv2.findContours(mask_closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
solid_mask = np.zeros((h, w), dtype=np.uint8)

# The cloud body and the 3 tail bubbles
for c in contours:
    if cv2.contourArea(c) > 50:
        cv2.drawContours(solid_mask, [c], -1, 255, -1)

# Smooth edges with antialiasing
alpha = cv2.GaussianBlur(solid_mask, (3, 3), 0)

# Build RGBA
rgba = cv2.cvtColor(f_with, cv2.COLOR_BGR2BGRA)
rgba[:, :, 3] = alpha

# Tight crop
ys, xs = np.where(alpha > 10)
min_y, max_y = ys.min(), ys.max()
min_x, max_x = xs.min(), xs.max()

tight_rgba = rgba[min_y:max_y+1, min_x:max_x+1]
cv2.imwrite('frontend/public/media/cloud_callout_s23.png', tight_rgba)
print(f'Extracted exact cloud_callout_s23.png: shape={tight_rgba.shape}')
print(f'Bounding box in 1280x720: x={min_x} ({min_x/12.8:.2f}%), y={min_y} ({min_y/7.2:.2f}%), w={max_x-min_x+1} ({(max_x-min_x+1)/12.8:.2f}%), h={max_y-min_y+1} ({(max_y-min_y+1)/7.2:.2f}%)')

# Save view on white
alpha_t = tight_rgba[:, :, 3] / 255.0
rgb_t = tight_rgba[:, :, :3]
bg_w = np.full_like(rgb_t, 255)
comp_w = (rgb_t * alpha_t[:, :, None] + bg_w * (1 - alpha_t[:, :, None])).astype(np.uint8)
cv2.imwrite('scratch/slides_24_27/cloud_callout_s23_exact_white.jpg', comp_w)
print('Saved test image')
