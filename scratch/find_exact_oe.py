import cv2, numpy as np

im = cv2.imread('scratch/slides_24_27/f_133.5s.jpg')
h, w, _ = im.shape # 540, 960

# Background subtraction: f_133.5s.jpg - f_130.0s.jpg
im_base = cv2.imread('scratch/slides_24_27/f_130.0s.jpg')

diff = cv2.absdiff(im, im_base)
diff_gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
# In baby region: y in 0..250, x in 0..300
mask = np.zeros_like(diff_gray)
mask[0:250, 0:300] = diff_gray[0:250, 0:300] > 20

# Bounding box of diff
num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(mask.astype(np.uint8))
print('Difference components between 133.5s and 130.0s:')
for i in range(1, num_labels):
    area = stats[i, cv2.CC_STAT_AREA]
    if area > 100:
        bx = stats[i, cv2.CC_STAT_LEFT]
        by = stats[i, cv2.CC_STAT_TOP]
        bw = stats[i, cv2.CC_STAT_WIDTH]
        bh = stats[i, cv2.CC_STAT_HEIGHT]
        print(f'Diff box: x={bx} ({bx/w*100:.2f}%), y={by} ({by/h*100:.2f}%), w={bw} ({bw/w*100:.2f}%), h={bh} ({bh/h*100:.2f}%), area={area}')
        cv2.imwrite(f'scratch/slides_24_27/diff_oe_crop.jpg', im[by:by+bh, bx:bx+bw])
