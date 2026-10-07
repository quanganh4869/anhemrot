import cv2, numpy as np

f24 = cv2.imread('scratch/slides_24_27/f_124.5s.jpg')
f25 = cv2.imread('scratch/slides_24_27/f_130.0s.jpg')
h, w, _ = f24.shape # 540, 960

# Let's find in f24 and f25 the pink border of the speech bubble
# Let's inspect where the pink border is
# Pink text/border color in HSV or BGR
# In BGR: pink has high R (> 180), low G (< 70), high B (> 100)
for name, im in [('s24', f24), ('s25', f25)]:
    pink = (im[:, :, 2] > 180) & (im[:, :, 1] < 70) & (im[:, :, 0] > 100)
    # Only in the lower-left quadrant: y > 200, x < 500
    sub_pink = np.zeros_like(pink)
    sub_pink[200:540, 0:500] = pink[200:540, 0:500]
    
    # Find bounding box of sub_pink
    ys, xs = np.where(sub_pink)
    if len(ys) > 0:
        min_y, max_y = ys.min(), ys.max()
        min_x, max_x = xs.min(), xs.max()
        print(f'{name} pink bounds: x=[{min_x}, {max_x}] ({min_x/w*100:.2f}% to {max_x/w*100:.2f}%), y=[{min_y}, {max_y}] ({min_y/h*100:.2f}% to {max_y/h*100:.2f}%)')
        print(f'{name} width={(max_x - min_x)/w*100:.2f}%, height={(max_y - min_y)/h*100:.2f}%')
