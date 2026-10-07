import cv2, numpy as np

f24 = cv2.imread('scratch/slides_24_27/vid_s24_1080.jpg')
callout24 = cv2.imread('frontend/public/media/cloud_callout_s24.png', cv2.IMREAD_UNCHANGED)

# Let's extract the pink border/mask of callout24
alpha = callout24[:, :, 3]
rgb = callout24[:, :, :3]
print('callout24 shape:', callout24.shape) # (541, 765, 4)

# Multi-scale template match using the text or pink border
# In f24, find where callout24 matches best
gray_f = cv2.cvtColor(f24, cv2.COLOR_BGR2GRAY)

best_val = -1
best_loc = None
best_scale = None

# In 1080p, the callout could be scaled from 0.5 to 1.5
for scale in np.linspace(0.8, 1.4, 30):
    w = int(callout24.shape[1] * scale)
    h = int(callout24.shape[0] * scale)
    if w >= 1920 or h >= 1080:
        continue
    scaled = cv2.resize(callout24, (w, h))
    # match only the text and pink border (alpha > 0 and not pure white)
    s_alpha = scaled[:, :, 3]
    s_gray = cv2.cvtColor(scaled[:, :, :3], cv2.COLOR_BGR2GRAY)
    
    # We can match using normalized cross correlation
    res = cv2.matchTemplate(gray_f, s_gray, cv2.TM_CCOEFF_NORMED, mask=s_alpha)
    min_v, max_v, min_l, max_l = cv2.minMaxLoc(res)
    if max_v > best_val:
        best_val = max_v
        best_loc = max_l
        best_scale = scale

print(f'Best match for s24: score={best_val:.4f}, scale={best_scale:.3f}, loc={best_loc}')
if best_loc:
    bx, by = best_loc
    bw = int(callout24.shape[1] * best_scale)
    bh = int(callout24.shape[0] * best_scale)
    print(f's24: left={bx/19.2:.2f}%, top={by/10.8:.2f}%, width={bw/19.2:.2f}%, height={bh/10.8:.2f}%')
