const { spawn } = require('child_process');

async function checkSlide(slideNum) {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless',
    '--remote-debugging-port=9222',
    `http://localhost:5173/?slide=${slideNum}`
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('localhost:5173'));
    if (!tab) {
      console.log('No tab found for slide', slideNum);
      return;
    }
    
    // Connect WebSocket to evaluate JS in the page
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    
    await new Promise((resolve) => {
      ws.addEventListener('open', () => {
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `
              (() => {
                const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
                  src: img.src,
                  opacity: window.getComputedStyle(img).opacity,
                  parentOpacity: window.getComputedStyle(img.parentElement).opacity,
                  rect: img.getBoundingClientRect()
                }));
                const texts = Array.from(document.querySelectorAll('p, span, div')).filter(e => e.children.length === 0 && e.textContent.trim()).map(e => ({
                  text: e.textContent.trim(),
                  rect: e.getBoundingClientRect()
                }));
                return { imgs, texts };
              })()
            `,
            returnByValue: true
          }
        }));
      });

      ws.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 1) {
          console.log(`=== DOM INSPECTION FOR SLIDE ${slideNum} ===`);
          const res = msg.result.result.value;
          console.log('Images:');
          res.imgs.forEach(img => {
            console.log('  ', img.src.split('/').pop(), 'opacity:', img.opacity, 'pOpacity:', img.parentOpacity, 'w/h:', Math.round(img.rect.width), Math.round(img.rect.height), 'top/left:', Math.round(img.rect.top), Math.round(img.rect.left));
          });
          resolve();
        }
      });
    });

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    edge.kill();
  }
}

async function run() {
  for (const s of [22, 23, 24, 25, 26]) {
    await checkSlide(s);
    await new Promise(r => setTimeout(r, 1000));
  }
}

run();
