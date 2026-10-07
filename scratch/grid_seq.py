import cv2, numpy as np

times = list(range(105, 135, 2))
# Make 5 rows x 3 cols grid of 320x180 images
rows = []
for r in range(5):
    row_imgs = []
    for c in range(3):
        idx = r * 3 + c
        if idx < len(times):
            t = times[idx]
            im = cv2.imread(f'scratch/slides_24_27/seq_{t}s.jpg')
            im_small = cv2.resize(im, (320, 180))
            cv2.putText(im_small, f'{t}s', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
            row_imgs.append(im_small)
        else:
            row_imgs.append(np.zeros((180, 320, 3), dtype=np.uint8))
    rows.append(np.hstack(row_imgs))

grid = np.vstack(rows)
cv2.imwrite('scratch/slides_24_27/seq_grid.jpg', grid)
print('Saved seq_grid.jpg')
