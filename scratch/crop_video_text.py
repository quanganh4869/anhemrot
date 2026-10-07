import cv2, os

# Video timestamps:
# Slide 23: ~118s - 122s
# Slide 24: ~123s - 127s
# Slide 25: ~128s - 134s
# Slide 26: ~135s - 140s

frames = [
    ('s23', 'f_120.0s.jpg'),
    ('s24', 'f_124.5s.jpg'),
    ('s25', 'f_130.0s.jpg'),
    ('s26', 'f_138.0s.jpg')
]

for s, f in frames:
    path = os.path.join('scratch/slides_24_27', f)
    if os.path.exists(path):
        im = cv2.imread(path)
        # In 1920x1080: save lower half where speech bubbles are
        h, w, _ = im.shape
        cv2.imwrite(f'scratch/slides_24_27/{s}_bottom.jpg', im[int(h*0.4):, :])
        cv2.imwrite(f'scratch/slides_24_27/{s}_full.jpg', im)
        print(f'{s} saved')
