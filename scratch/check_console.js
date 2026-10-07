import { spawn } from 'child_process';

const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless',
  '--remote-debugging-port=9222',
  'http://localhost:5173/?slide=14'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://localhost:9222/json');
    const tabs = await res.json();
    console.log('Tabs:', tabs);
    const pageTab = tabs.find(t => t.type === 'page');
    if (pageTab && pageTab.webSocketDebuggerUrl) {
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      };
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.exceptionThrown') {
          console.error('EXCEPTION:', JSON.stringify(msg.params.exceptionDetails));
        } else if (msg.method === 'Console.messageAdded') {
          console.log('CONSOLE:', msg.params.message.text);
        }
      };
      setTimeout(() => {
        edge.kill();
        process.exit(0);
      }, 3000);
    }
  } catch (err) {
    console.error('Error:', err);
    edge.kill();
    process.exit(1);
  }
}, 2000);
