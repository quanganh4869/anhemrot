from PIL import Image

im = Image.open('scratch/clean_s24.png')
w, h = im.size
print(f"Image size: {w}x{h}")

# The stage is 1920x1080 scaled to viewport
# Let's inspect coordinates of the purple lake region
# Left of rabbit body: around x = 440 (440/756 = 58%)
# Right of yellow shapes: around x = 160 (160/756 = 21%)
# Bottom of cradle: around y = 350 (350/488 = 71%)
# Bottom of stage: y = 460 (460/488 = 94%)
print("Recommended box in viewport coords: x from 22% to 54%, y from 72% to 92%")
