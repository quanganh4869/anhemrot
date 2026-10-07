import cv2, numpy as np

def render_slide(slide_elements, bg_color):
    # Create 1920x1080 canvas
    # bg_color is hex e.g. #1a0d2e -> BGR: [0x2e, 0x0d, 0x1a]
    r = int(bg_color[1:3], 16)
    g = int(bg_color[3:5], 16)
    b = int(bg_color[5:7], 16)
    canvas = np.full((1080, 1920, 3), [b, g, r], dtype=np.uint8)

    # Sort elements by zIndex
    sorted_els = sorted(slide_elements, key=lambda x: x.get('zIndex', 0))
    for el in sorted_els:
        media = el.get('media')
        if media:
            path = f'frontend/public/media/{media}'
            im = cv2.imread(path, cv2.IMREAD_UNCHANGED)
            if im is None:
                continue
            
            x = int(el['left'] * 1920 / 100)
            y = int(el['top'] * 1080 / 100)
            w = int(el['width'] * 1920 / 100)
            h = int(el['height'] * 1080 / 100)
            if w <= 0 or h <= 0:
                continue
            
            # resize im
            resized = cv2.resize(im, (w, h), interpolation=cv2.INTER_LINEAR)
            
            # alpha blend onto canvas
            # clip coords
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

# Current Slide 24 elements from slidesData.ts
s24_els = [
    {'media': 'image16.png', 'left': 0.0, 'top': 0.0, 'width': 100.0, 'height': 251.43, 'zIndex': 1},
    {'media': 'image21.png', 'left': 0.0, 'top': -75.72, 'width': 136.25, 'height': 342.58, 'zIndex': 7},
    {'media': 'image20.png', 'left': 40.88, 'top': 0.0, 'width': 37.81, 'height': 163.04, 'zIndex': 17},
    {'media': 'image27.png', 'left': 7.78, 'top': 4.49, 'width': 33.1, 'height': 59.92, 'zIndex': 18},
    {'media': 'cloud_callout_s24.png', 'left': 4.5, 'top': 48.0, 'width': 55.0, 'height': 44.0, 'zIndex': 30},
]

# Current Slide 25 elements from slidesData.ts
s25_els = [
    {'media': 'image16.png', 'left': 0.0, 'top': 0.0, 'width': 100.0, 'height': 251.43, 'zIndex': 1},
    {'media': 'image21.png', 'left': 0.0, 'top': -75.72, 'width': 136.25, 'height': 342.58, 'zIndex': 7},
    {'media': 'image20.png', 'left': 54.06, 'top': 3.88, 'width': 37.81, 'height': 163.04, 'zIndex': 17},
    {'media': 'cloud_callout_s25.png', 'left': 4.5, 'top': 50.0, 'width': 54.0, 'height': 43.0, 'zIndex': 30},
    {'media': 'image28.png', 'left': 0.0, 'top': -92.49, 'width': 49.05, 'height': 123.33, 'zIndex': 14},
    {'media': 'image20_baby.png', 'left': 2.15, 'top': 3.88, 'width': 36.58, 'height': 62.05, 'zIndex': 15},
    {'media': 'image29.png', 'left': 43.6, 'top': 69.84, 'width': 49.05, 'height': 123.33, 'zIndex': 21},
    {'media': 'text_s25_21.png', 'left': 3.0, 'top': 15.07, 'width': 16.23, 'height': 8.8, 'zIndex': 25},
    {'media': 'image30.png', 'left': 43.6, 'top': 70.0, 'width': 49.05, 'height': 123.33, 'zIndex': 23},
    {'media': 'image31.png', 'left': 64.36, 'top': 128.44, 'width': 23.74, 'height': 45.67, 'zIndex': 24},
]

c24 = render_slide(s24_els, '#1a0d2e')
c25 = render_slide(s25_els, '#1a0d2e')

cv2.imwrite('scratch/slides_24_27/rendered_s24.jpg', c24)
cv2.imwrite('scratch/slides_24_27/rendered_s25.jpg', c25)

# Save side-by-side comparison for 24 and 25
v24 = cv2.imread('scratch/slides_24_27/vid_s24_1080.jpg')
v25 = cv2.imread('scratch/slides_24_27/vid_s25_1080.jpg')

comp24 = np.hstack([cv2.resize(v24, (960, 540)), cv2.resize(c24, (960, 540))])
comp25 = np.hstack([cv2.resize(v25, (960, 540)), cv2.resize(c25, (960, 540))])

cv2.imwrite('scratch/slides_24_27/comp24.jpg', comp24)
cv2.imwrite('scratch/slides_24_27/comp25.jpg', comp25)
print('Saved comparisons')
