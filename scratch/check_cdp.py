import urllib.request
import json
import time
import subprocess
import websocket

# Start Edge with remote debugging
proc = subprocess.Popen([
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "--headless",
    "--remote-debugging-port=9222",
    "http://localhost:5173/"
])

time.sleep(2)
try:
    with urllib.request.urlopen("http://localhost:9222/json") as resp:
        tabs = json.loads(resp.read().decode())
    print("Tabs:", tabs)
finally:
    proc.terminate()
