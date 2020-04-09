#!/usr/bin/env node
const {processWebSocket} = require('./websocket_helper');
const server = 'ws://127.0.0.1:8080/';

const repl = require('repl');
const replServer = repl.start();

replServer.defineCommand('testSites', {
  help: 'Start test sites. Usage: <site1> <site2> ... <iteration>',
  action: (info) => {
    const infoList = info.trim().split(/\ +/);
    const data = infoList.slice(0, infoList.length - 1);
    const pkg = {
      command: 'startTest',
      data: data,
      iter: infoList[infoList.length - 1]
    };
    processWebSocket(server, pkg);
  }
});

replServer.defineCommand('getStatus', {
  help: 'Get test status by handle. Usage: <handle>',
  action: (info) => {
    const pkg = {
      command: 'testStatus',
      testHandle: info
    };
    processWebSocket(server, pkg);
  }
});

replServer.defineCommand('getResults', {
  help: 'Get test result by handle. Usage: <handle>',
  action: (info) => {
    const pkg = {
      command: 'testResults',
      testHandle: info
    };
    processWebSocket(server, pkg);
  }
});

replServer.defineCommand('getAll', {
  help: 'Get all handles.',
  action: (info) => {
    const pkg = {
      command: 'allTests'
    };
    processWebSocket(server, pkg);
  }
});

