import cv2

# Let's check frames at every 5s from 100s to 135s
cap = cv2.VideoCapture('260830 Loi ru _ childhood story_TEST 2.mp4')
fps = cap.get(cv2.CAP_PROP_FPS)

for t in range(105, 135, 2):
    frame_no = int(t * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_no)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(f'scratch/slides_24_27/seq_{t}s.jpg', cv2.resize(frame, (640, 360)))
cap.release()
print('Extracted sequence')
