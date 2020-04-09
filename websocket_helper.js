const WebSocket = require('ws');

const processWebSocket = (server, pkg) => {
  const ws = new WebSocket(server);
  ws.on('open', () => {
    console.log('client send: ', pkg);
    const msg = Buffer.from(JSON.stringify(pkg));
    ws.send(msg);
  });

  ws.on('message', (msg) => {
    const pkg = JSON.parse(msg.toString());
    console.log('client receive: ', pkg);
    ws.close();
  });
}
  
exports.processWebSocket = processWebSocket;
