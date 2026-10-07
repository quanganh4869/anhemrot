import cv2, numpy as np

# Current Slide 23 elements from slidesData.ts:
# Let's inspect all elements of Slide 23:
s23_els = [
    {'media': 'image16.png', 'left': 0.0, 'top': 0.0, 'width': 100.0, 'height': 251.43, 'zIndex': 1},
    {'media': 'image21.png', 'left': 0.0, 'top': -75.72, 'width': 136.25, 'height': 342.58, 'zIndex': 7},
    {'media': 'image20.png', 'left': 40.88, 'top': 0.0, 'width': 37.81, 'height': 163.04, 'zIndex': 17},
    {'media': 'cloud_callout_s23.png', 'left': 5.21, 'top': 59.22, 'width': 32.19, 'height': 29.84, 'zIndex': 30},
    {'media': 'image27.png', 'left': 7.78, 'top': 4.49, 'width': 33.1, 'height': 59.92, 'zIndex': 18},
]

def render_elements(elements, bg_color):
    r = int(bg_color[1:3], 16)
    g = int(bg_color[3:5], 16)
    b = int(bg_color[5:7], 16)
    canvas = np.full((1080, 1920, 3), [b, g, r], dtype=np.uint8)

    sorted_els = sorted(elements, key=lambda x: x.get('zIndex', 0))
    for el in sorted_els:
        media = el.get('media')
        if not media:
            continue
        im = cv2.imread(f'frontend/public/media/{media}', cv2.IMREAD_UNCHANGED)
        if im is None:
            print('Missing:', media)
            continue
            
        x = int(el['left'] * 1920 / 100)
        y = int(el['top'] * 1080 / 100)
        w = int(el['width'] * 1920 / 100)
        h = int(el['height'] * 1080 / 100)
        if w <= 0 or h <= 0:
            continue
            
        resized = cv2.resize(im, (w, h), interpolation=cv2.INTER_LINEAR)
        x1, y1 = max(0, x), max(0, y)
        x2, y2 = min(1920, x + w), min(1080, y + h)
        if x2 <= x1 or y2 <= y1:
            continue
            
        crop_rx1 = x1 - x
        crop_ry1 = y1 - y
        crop_rx2 = crop_rx1 + (x2 - x1)
        crop_ry2 = crop_ry1 + (y2 - y1)
        
        sub_res = resized[crop_ry1:crop_ry2, crop_rx1:crop_rx2]
        if sub_res.shape[2] == 4:
            alpha = sub_res[:, :, 3] / 255.0
            rgb = sub_res[:, :, :3]
            canvas_sub = canvas[y1:y2, x1:x2]
            canvas[y1:y2, x1:x2] = (rgb * alpha[:, :, None] + canvas_sub * (1 - alpha[:, :, None])).astype(np.uint8)
        else:
            canvas[y1:y2, x1:x2] = sub_res[:, :, :3]
    return canvas

c23 = render_elements(s23_els, '#1a0d2e')
v23 = cv2.imread('scratch/slides_24_27/f_119.0s.jpg')
v23 = cv2.resize(v23, (1920, 1080))

comp23 = np.hstack([cv2.resize(v23, (960, 540)), cv2.resize(c23, (960, 540))])
cv2.imwrite('scratch/slides_24_27/comp23.jpg', comp23)
print('Saved comp23.jpg')
