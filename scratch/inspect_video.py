import cv2

video_path = "260830 Loi ru _ childhood story_TEST 2.mp4"
cap = cv2.VideoCapture(video_path)

fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = total_frames / fps
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

print(f"Video: {w}x{h}, {fps:.2f} fps, {total_frames} frames, duration: {duration:.2f}s")
