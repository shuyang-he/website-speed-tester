#!/usr/bin/env node
const WebSocket = require('ws');
const wss = new WebSocket.Server({
  port: 8080,
});

const fetch = require('node-fetch');
const {processTest} = require('./tests');

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    const pkg = JSON.parse(msg.toString());
    console.log('server receive: ', pkg);
    processTest(pkg)
    .then((res) => {
      const msg = Buffer.from(JSON.stringify(res));
      ws.send(msg);
      console.log('server send: ', res);
    }); 
    const data = {
      testHandle: 0,
      status: 'started'
    }
    const res = Buffer.from(JSON.stringify(data));
    ws.send(res); 
  });
  
});
