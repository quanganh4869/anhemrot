import cv2
import os

os.makedirs('scratch/video_frames', exist_ok=True)
video_path = "260830 Loi ru _ childhood story_TEST 2.mp4"
cap = cv2.VideoCapture(video_path)

fps = cap.get(cv2.CAP_PROP_FPS)

# Extract frames every 3 seconds
for sec in range(0, 160, 3):
    frame_no = int(sec * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_no)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f'scratch/video_frames/frame_{sec:03d}s.jpg', frame)

print("Extracted frames!")
