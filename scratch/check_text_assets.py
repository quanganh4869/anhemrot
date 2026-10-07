import os, cv2, numpy as np

# Check all media files in frontend/public/media/
files = os.listdir('frontend/public/media')
for f in sorted(files):
    if f.startswith('cloud_callout') or f.startswith('text_'):
        path = os.path.join('frontend/public/media', f)
        im = cv2.imread(path, cv2.IMREAD_UNCHANGED)
        if im is not None:
            # check non-white opaque
            if im.shape[2] == 4:
                alpha = im[:, :, 3]
                opaque = im[alpha > 50]
                print(f'{f}: shape={im.shape}, non-transparent pixels={len(opaque)}')
            else:
                print(f'{f}: shape={im.shape} (no alpha)')
