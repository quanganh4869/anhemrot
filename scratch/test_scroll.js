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
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 2000));

  // Let's inspect console errors during scrolling
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.method === 'Runtime.exceptionThrown') {
      console.error('JS EXCEPTION:', JSON.stringify(m.params));
    }
  });

  // Evaluate scroll progress and capture at intervals between slide 13 and 26
  for (let s = 13; s <= 26; s += 0.5) {
    const progress = s - 1; // 0-based
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const targetY = (${progress} / 30) * maxScroll;
          window.scrollTo(0, targetY);
        })()
      `
    });
    await new Promise(r => setTimeout(r, 150));
  }

  console.log('Scroll test completed without crash!');
  edge.kill();
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  edge.kill();
  process.exit(1);
});
