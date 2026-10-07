import cv2, os, numpy as np

for t in range(105, 135, 2):
    fn = f'scratch/slides_24_27/seq_{t}s.jpg'
    im = cv2.imread(fn)
    # Check if there is white cloud, navy cloud, etc.
    # What text or shapes are visible?
    print(f'=== {t}s ===')
