import cv2
import os

video_path = "260830 Loi ru _ childhood story_TEST 2.mp4"
cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)

os.makedirs('scratch/deep_frames', exist_ok=True)

# Extract frames from 100s to 155s every 2 seconds
for sec in range(100, 156, 2):
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(sec * fps))
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f'scratch/deep_frames/f_{sec:03d}s.jpg', frame)

print("Extracted deep frames!")
