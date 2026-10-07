import { spawn } from 'child_process';

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
  await new Promise(r => setTimeout(r, 1500));

  // Click next button 20 times and print currentSlideIndex text
  for (let step = 1; step <= 25; step++) {
    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const nextBtn = document.querySelector('button[aria-label="Trang sau"]');
          if (nextBtn) nextBtn.click();
          const pageIndicator = document.querySelector('.font-mono')?.innerText || 'none';
          const scrollY = window.scrollY;
          return { pageIndicator, scrollY };
        })()
      `,
      returnByValue: true
    });
    console.log(`Step ${step}:`, evalRes.result.value);
    await new Promise(r => setTimeout(r, 800));
  }

  edge.kill();
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  edge.kill();
  process.exit(1);
});
