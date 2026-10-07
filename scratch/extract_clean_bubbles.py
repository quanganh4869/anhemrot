import cv2, numpy as np

for name, y_off in [('s24', 200), ('s25', 300)]:
    crop = cv2.imread(f'scratch/slides_24_27/{name}_bubble_zone.png')
    h, w, _ = crop.shape
    
    # In both crops, the text is inside the white cloud.
    # Where is the white cloud? It has R > 200, G > 200, B > 200 (or the pink text inside)
    # The pink border is R > 170, G < 80, B > 90
    # Let's find the outer contour of the pink border and cloud
    
    # Cloud interior + text + pink border mask:
    # Any pixel that is:
    # 1) White or light: R > 210, G > 200, B > 200
    # 2) Pink text or border: R > 150, G < 100, B > 70
    is_cloud_or_border = ((crop[:, :, 2] > 200) & (crop[:, :, 1] > 190) & (crop[:, :, 0] > 190)) | \
                         ((crop[:, :, 2] > 140) & (crop[:, :, 1] < 110) & (crop[:, :, 0] > 70))
    
    # We can seed a flood fill or morphological close to get the solid mask
    mask = is_cloud_or_border.astype(np.uint8) * 255
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask_closed = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    
    # Find all contours in mask_closed
    contours, hierarchy = cv2.findContours(mask_closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Keep contours with area > 1000 (cloud body and tail circles)
    solid_mask = np.zeros((h, w), dtype=np.uint8)
    for c in contours:
        area = cv2.contourArea(c)
        if area > 100: # tail circles are area ~200-1500
            # Check if this contour is part of the bubble
            # Draw filled
            cv2.drawContours(solid_mask, [c], -1, 255, -1)
            
    # Smooth the mask boundary slightly
    solid_mask = cv2.GaussianBlur(solid_mask, (3, 3), 0)
    
    # Create RGBA
    rgba = cv2.cvtColor(crop, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = solid_mask
    
    # Tight crop
    ys, xs = np.where(solid_mask > 20)
    if len(ys) > 0:
        tight_rgba = rgba[ys.min():ys.max()+1, xs.min():xs.max()+1]
        cv2.imwrite(f'scratch/slides_24_27/{name}_extracted_bubble.png', tight_rgba)
        
        # Save on black and white to check
        alpha_t = tight_rgba[:, :, 3] / 255.0
        rgb_t = tight_rgba[:, :, :3]
        bg_b = np.zeros_like(rgb_t)
        bg_w = np.full_like(rgb_t, 255)
        comp_b = (rgb_t * alpha_t[:, :, None] + bg_b * (1 - alpha_t[:, :, None])).astype(np.uint8)
        comp_w = (rgb_t * alpha_t[:, :, None] + bg_w * (1 - alpha_t[:, :, None])).astype(np.uint8)
        cv2.imwrite(f'scratch/slides_24_27/{name}_extracted_on_black.jpg', comp_b)
        cv2.imwrite(f'scratch/slides_24_27/{name}_extracted_on_white.jpg', comp_w)
        
        # Output position relative to 1280x720 video
        rel_x = xs.min()
        rel_y = y_off + ys.min()
        rel_w = xs.max() - xs.min() + 1
        rel_h = ys.max() - ys.min() + 1
        print(f'{name} extracted: x={rel_x} ({rel_x/12.8:.2f}%), y={rel_y} ({rel_y/7.2:.2f}%), w={rel_w} ({rel_w/12.8:.2f}%), h={rel_h} ({rel_h/7.2:.2f}%)')
