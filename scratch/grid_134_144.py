import cv2, numpy as np

times = list(range(134, 146, 2))
imgs = []
for t in times:
    im = cv2.imread(f'scratch/slides_24_27/seq_{t}s.jpg')
    im_small = cv2.resize(im, (320, 180))
    cv2.putText(im_small, f'{t}s', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
    imgs.append(im_small)

row1 = np.hstack(imgs[:3])
row2 = np.hstack(imgs[3:])
grid = np.vstack([row1, row2])
cv2.imwrite('scratch/slides_24_27/seq_134_144_grid.jpg', grid)
print('Saved grid')
