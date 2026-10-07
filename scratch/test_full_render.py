import cv2, numpy as np

# Load video frames
v24 = cv2.imread('scratch/slides_24_27/orig_frame_124.5s.png')
v24_1080 = cv2.resize(v24, (1920, 1080))

v25 = cv2.imread('scratch/slides_24_27/orig_frame_133.5s.png')
v25_1080 = cv2.resize(v25, (1920, 1080))

v26 = cv2.imread('scratch/slides_24_27/orig_frame_137.5s.png')
v26_1080 = cv2.resize(v26, (1920, 1080))

def render_elements_to_canvas(elements, bg_color):
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

# Overwrite cloud_callout_s25.png with the clean version
clean25 = cv2.imread('scratch/slides_24_27/cloud_callout_s25_clean.png', cv2.IMREAD_UNCHANGED)
cv2.imwrite('frontend/public/media/cloud_callout_s25.png', clean25)

s24_els = [
    {'media': 'image16.png', 'left': 0.0, 'top': 0.0, 'width': 100.0, 'height': 251.43, 'zIndex': 1},
    {'media': 'image21.png', 'left': 0.0, 'top': -75.72, 'width': 136.25, 'height': 342.58, 'zIndex': 7},
    {'media': 'image20.png', 'left': 40.88, 'top': 0.0, 'width': 37.81, 'height': 163.04, 'zIndex': 17},
    {'media': 'image27.png', 'left': 7.78, 'top': 4.49, 'width': 33.1, 'height': 59.92, 'zIndex': 18},
    {'media': 'cloud_callout_s24.png', 'left': 0.0, 'top': 36.0, 'width': 50.9, 'height': 64.0, 'zIndex': 30},
]

s25_els = [
    {'media': 'image16.png', 'left': 0.0, 'top': 0.0, 'width': 100.0, 'height': 251.43, 'zIndex': 1},
    {'media': 'image21.png', 'left': 0.0, 'top': -75.72, 'width': 136.25, 'height': 342.58, 'zIndex': 7},
    {'media': 'image20.png', 'left': 54.06, 'top': 3.88, 'width': 37.81, 'height': 163.04, 'zIndex': 17},
    {'media': 'cloud_callout_s25.png', 'left': 0.0, 'top': 53.0, 'width': 58.3, 'height': 47.0, 'zIndex': 30},
    {'media': 'image28.png', 'left': 0.0, 'top': -92.49, 'width': 49.05, 'height': 123.33, 'zIndex': 14},
    {'media': 'image20_baby.png', 'left': 2.15, 'top': 3.88, 'width': 36.58, 'height': 62.05, 'zIndex': 15},
    {'media': 'image29.png', 'left': 43.6, 'top': 69.84, 'width': 49.05, 'height': 123.33, 'zIndex': 21},
    {'media': 'text_s25_21.png', 'left': 3.44, 'top': 8.89, 'width': 15.0, 'height': 21.0, 'zIndex': 25},
    {'media': 'image30.png', 'left': 43.6, 'top': 70.0, 'width': 49.05, 'height': 123.33, 'zIndex': 23},
    {'media': 'image31_baby.png', 'left': 66.64, 'top': 46.94, 'width': 20.16, 'height': 32.78, 'zIndex': 24},
]

s26_els = [
    {'media': 'image32.png', 'left': 0.0, 'top': -2.38, 'width': 100.0, 'height': 251.43, 'zIndex': 1},
    {'media': 'image16.png', 'left': -16.31, 'top': -43.39, 'width': 132.62, 'height': 333.45, 'zIndex': 2},
    {'media': 'image28.png', 'left': 0.0, 'top': 0.0, 'width': 49.05, 'height': 123.33, 'zIndex': 12},
    {'media': 'cloud_callout_s26.png', 'left': 17.04, 'top': 0.0, 'width': 49.05, 'height': 65.82, 'zIndex': 30},
    {'media': 'image29.png', 'left': 43.6, 'top': -23.33, 'width': 49.05, 'height': 123.33, 'zIndex': 14},
    {'media': 'image30.png', 'left': 43.6, 'top': -23.33, 'width': 49.05, 'height': 123.33, 'zIndex': 15},
    {'media': 'image31_baby.png', 'left': 66.64, 'top': 46.94, 'width': 20.16, 'height': 32.78, 'zIndex': 18},
]

c24 = render_elements_to_canvas(s24_els, '#1a0d2e')
c25 = render_elements_to_canvas(s25_els, '#1a0d2e')
c26 = render_elements_to_canvas(s26_els, '#0d1b3a')

comp24 = np.hstack([cv2.resize(v24_1080, (960, 540)), cv2.resize(c24, (960, 540))])
comp25 = np.hstack([cv2.resize(v25_1080, (960, 540)), cv2.resize(c25, (960, 540))])
comp26 = np.hstack([cv2.resize(v26_1080, (960, 540)), cv2.resize(c26, (960, 540))])

cv2.imwrite('scratch/slides_24_27/comp24_new.jpg', comp24)
cv2.imwrite('scratch/slides_24_27/comp25_new.jpg', comp25)
cv2.imwrite('scratch/slides_24_27/comp26_new.jpg', comp26)

print('Rendered new comparisons')
