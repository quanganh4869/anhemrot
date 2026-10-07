import cv2, numpy as np

im24 = cv2.imread('frontend/public/media/cloud_callout_s24.png', cv2.IMREAD_UNCHANGED)
print('im24 shape:', im24.shape) # 541, 765
alpha = im24[:, :, 3]
ys, xs = np.where(alpha > 0)
print(f'im24 non-transparent: x=[{xs.min()}, {xs.max()}], y=[{ys.min()}, {ys.max()}]')
w = xs.max() - xs.min() + 1
h = ys.max() - ys.min() + 1
print(f'tight bounds: w={w}, h={h}, ratio={w/h:.3f}')
