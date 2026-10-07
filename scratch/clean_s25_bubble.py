import cv2, numpy as np

im25 = cv2.imread('frontend/public/media/cloud_callout_s25.png', cv2.IMREAD_UNCHANGED)
# Crop rows 0 to 315
clean25 = im25[0:315, :]
# Trim transparent columns on left/right/bottom if any
alpha = clean25[:, :, 3]
ys, xs = np.where(alpha > 0)
clean25 = clean25[ys.min():ys.max()+1, xs.min():xs.max()+1]
print('clean25 shape:', clean25.shape)

cv2.imwrite('scratch/slides_24_27/cloud_callout_s25_clean.png', clean25)

# Also save on white background to view
alpha_c = clean25[:, :, 3] / 255.0
rgb_c = clean25[:, :, :3]
bg_w = np.full_like(rgb_c, 255)
comp_w = (rgb_c * alpha_c[:, :, None] + bg_w * (1 - alpha_c[:, :, None])).astype(np.uint8)
cv2.imwrite('scratch/slides_24_27/cloud_callout_s25_clean_white.jpg', comp_w)
print('Saved clean25')
