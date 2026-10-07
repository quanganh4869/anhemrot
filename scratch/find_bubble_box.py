import cv2, numpy as np

# Let's inspect s24_full.jpg, s25_full.jpg, s26_full.jpg
for name in ['s24', 's25', 's26']:
    im = cv2.imread(f'scratch/slides_24_27/{name}_full.jpg')
    h, w, _ = im.shape
    # Find white/near-white cloud regions (bubble interior)
    # The cloud bubble in s24, s25, s26 is white with pink border or similar
    # In s24: let's find pixels where R > 230, G > 230, B > 230
    white_mask = (im[:, :, 0] > 230) & (im[:, :, 1] > 230) & (im[:, :, 2] > 230)
    # Connected components
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(white_mask.astype(np.uint8))
    # find components with area > 10000
    print(f'=== {name} (shape {w}x{h}) ===')
    for i in range(1, num_labels):
        area = stats[i, cv2.CC_STAT_AREA]
        if area > 10000:
            bx = stats[i, cv2.CC_STAT_LEFT]
            by = stats[i, cv2.CC_STAT_TOP]
            bw = stats[i, cv2.CC_STAT_WIDTH]
            bh = stats[i, cv2.CC_STAT_HEIGHT]
            # Convert to percentages
            px = bx / w * 100
            py = by / h * 100
            pw = bw / w * 100
            ph = bh / h * 100
            print(f'  White region: x={px:.2f}%, y={py:.2f}%, w={pw:.2f}%, h={ph:.2f}%, area={area}')
            # Crop the bounding box of the bubble and save
            cv2.imwrite(f'scratch/slides_24_27/{name}_detected_bubble_{i}.jpg', im[by:by+bh, bx:bx+bw])
