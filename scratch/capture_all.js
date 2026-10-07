import { spawn } from 'child_process';
import fs from 'fs';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--window-size=1920,1080',
  'about:blank'
]);

async function run() {
  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://localhost:9222/json');
  const tabs = await res.json();
  const pageTab = tabs.find(t => t.type === 'page');
  if (!pageTab) throw new Error('No page tab');

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg.result);
      callbacks.delete(msg.id);
    }
  };

  const send = (method, params = {}) => new Promise((resolve) => {
    const msgId = id++;
    callbacks.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false
  });

  for (let s of [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]) {
    console.log(`Navigating to slide ${s}...`);
    await send('Page.navigate', { url: `http://localhost:5173/?slide=${s}` });
    await new Promise(r => setTimeout(r, 1200));
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`scratch/snap_s${s}.png`, Buffer.from(data, 'base64'));
    console.log(`Saved scratch/snap_s${s}.png`);
  }

  edge.kill();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  edge.kill();
  process.exit(1);
});
