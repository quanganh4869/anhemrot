import cv2, numpy as np

im25 = cv2.imread('frontend/public/media/cloud_callout_s25.png', cv2.IMREAD_UNCHANGED)
print('im25 shape:', im25.shape) # (475, 695, 4)

# Where are the circles in im25?
# Let's inspect the alpha and pixels of im25 in lower rows
alpha = im25[:, :, 3]
row_sums = np.sum(alpha > 50, axis=1)
for r in range(len(row_sums)-1, 0, -10):
    if row_sums[r] > 0:
        print(f'Row {r}: {row_sums[r]} opaque pixels')
