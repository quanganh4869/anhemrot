import cv2

cap = cv2.VideoCapture('260830 Loi ru _ childhood story_TEST 2.mp4')
fps = cap.get(cv2.CAP_PROP_FPS)

times = [124.5, 130.0, 133.5, 137.5]
for t in times:
    frame_no = int(t * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_no)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f'scratch/slides_24_27/orig_frame_{t}s.png', frame)
        print(f'Saved orig_frame_{t}s.png (shape {frame.shape})')
cap.release()
