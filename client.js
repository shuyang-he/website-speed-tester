#!/usr/bin/env node
const WebSocket = require('ws');

const repl = require('repl');
const replServer = repl.start();


replServer.defineCommand('testSites', {
  help: 'testSites',
  action: (info) => {
    const infoList = info.trim().split(/\ +/);
    const data = infoList.slice(0, infoList.length - 1);
    const pkg = {
      data: data,
      iter: infoList[infoList.length - 1]
    };
    const ws = new WebSocket('ws://127.0.0.1:8080/');
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
});
replServer.defineCommand('getStatus', () => {
  process.exit();
});
replServer.defineCommand('getResults', () => {
  process.exit();
});
replServer.defineCommand('getAll', () => {
  process.exit();
});
replServer.defineCommand('quit', () => {
  process.exit();
});
