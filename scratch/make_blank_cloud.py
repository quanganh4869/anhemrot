import cv2, numpy as np

im24 = cv2.imread('frontend/public/media/cloud_callout_s24.png', cv2.IMREAD_UNCHANGED)
print('im24 shape:', im24.shape) # 541, 765, 4

# Let's inspect where the text is in im24:
# In im24, the pink text color is BGR [127, 0, 232] or similar (R>180, G<60, B>90)
# And the white cloud background is [255, 255, 255]
# If we replace all pink text inside the cloud with white [255, 255, 255]:
# we get a completely clean, blank cloud callout!
blank = im24.copy()
# The pink border is on the outer edge, text is in the center
# Text area is approximately y in 200..500, x in 100..650
# In this region, any non-white pixel with alpha == 255 is text!
for y in range(210, 500):
    for x in range(120, 650):
        if blank[y, x, 3] == 255:
            # Check if it's text (not pure white)
            if blank[y, x, 0] < 240 or blank[y, x, 1] < 240 or blank[y, x, 2] < 240:
                # Fill with white
                blank[y, x, :3] = [255, 255, 255]

cv2.imwrite('scratch/slides_24_27/blank_cloud.png', blank)
print('Saved blank cloud')
