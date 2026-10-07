import cv2, os

for t in [127.5, 128.0, 128.5, 129.0, 129.5, 130.0, 130.5, 131.0, 131.5, 132.0, 132.5, 133.0, 133.5, 134.0, 134.5]:
    fn = f'scratch/slides_24_27/f_{t}s.jpg'
    if os.path.exists(fn):
        im = cv2.imread(fn)
        # Check pink pixels in baby area (around mouth / head)
        # Head is roughly y: 80 to 250, x: 100 to 300
        crop = im[50:350, 50:400]
        # In BGR: pink text '#ED0081' is R ~ 237, G ~ 0, B ~ 129 -> BGR [129, 0, 237]
        pink_mask = (crop[:, :, 2] > 200) & (crop[:, :, 1] < 50) & (crop[:, :, 0] > 100)
        cnt = pink_mask.sum()
        print(f'{t}s: pink pixels near baby = {cnt}')
        if cnt > 100:
            cv2.imwrite(f'scratch/slides_24_27/s25_oe_{t}s.jpg', crop)
