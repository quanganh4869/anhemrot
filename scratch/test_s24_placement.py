import cv2, numpy as np

# Load 1280x720 video frame
v24 = cv2.imread('scratch/slides_24_27/orig_frame_124.5s.png')
# Resize to 1920x1080
v24_1080 = cv2.resize(v24, (1920, 1080))

im24 = cv2.imread('frontend/public/media/cloud_callout_s24.png', cv2.IMREAD_UNCHANGED)

# Let's test placing at:
# left = 0.0, top = 35.5, width = 50.9, height = 64.0
x = int(0.0 * 1920 / 100)
y = int(35.5 * 1080 / 100)
w = int(50.9 * 1920 / 100)
h = int(64.0 * 1080 / 100)

rendered = cv2.resize(im24, (w, h))

canvas = v24_1080.copy()
alpha = rendered[:, :, 3] / 255.0
rgb = rendered[:, :, :3]
canvas[y:y+h, x:x+w] = (rgb * alpha[:, :, None] + canvas[y:y+h, x:x+w] * (1 - alpha[:, :, None])).astype(np.uint8)

# Save comparison side by side: video frame vs video frame with our bubble
comp = np.hstack([cv2.resize(v24_1080, (960, 540)), cv2.resize(canvas, (960, 540))])
cv2.imwrite('scratch/slides_24_27/test_s24_placement.jpg', comp)
print('Saved test_s24_placement.jpg')
