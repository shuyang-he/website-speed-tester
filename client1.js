#!/usr/bin/env node
const {processWebSocket} = require('./websocket_helper');
const server = 'ws://127.0.0.1:8080/';

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands = {
  testSites: 'testSites',
  getStatus: 'getStatus',
  getResults: 'getResults',
  getAll: 'getAll',
  quit: 'quit',
  help: 'help'
};
let pkg = null;

rl.prompt();

rl.on('line', (line) => {
  const info = line.trim().split(/\ +/);
  switch (info[0]) {
    case commands.testSites:
      const data = info.slice(1, info.length - 1);
      if (info.length >= 3 && Number.isInteger(info[info.length - 1])) {
        pkg = {
          command: 'startTest',
          data: data,
          iter: info[info.length - 1]
        };
        processWebSocket(server, pkg);
      } else {
        console.log('testSites: Start test sites. Usage: <site1> <site2> ... <iteration>');
      }
      break;
    case commands.getStatus:
      if (info.length == 2) {
        pkg = {
          command: 'testStatus',
          testHandle: info[1]
        };
        processWebSocket(server, pkg);
      } else {
        console.log('getStatus: Get test status by handle. Usage: <handle>');
      }
      break;
    case commands.getResults:
      if (info.length == 2) {
        pkg = {
          command: 'testResults',
          testHandle: info[1]
        };
        processWebSocket(server, pkg);
      } else {
        console.log('getResults: Get test result by handle. Usage: <handle>');
      }
      break;
    case commands.getAll:
      if (info.length == 1) {
        pkg = {
          command: 'allTests'
        };
        processWebSocket(server, pkg);
      } else {
        console.log('getAll: Get all handles.');
      }
      break;
    case commands.quit:
      if (info.length == 1) {
        process.exit(0);
      } else {
        console.log('quit: Quit the program.');
      }
      break;
    case commands.help:
      if (info.length == 1) {
        console.log('testSites: Start test sites. Usage: <site1> <site2> ... <iteration>');
        console.log('getStatus: Get test status by handle. Usage: <handle>');
        console.log('getResults: Get test result by handle. Usage: <handle>');
        console.log('getAll: Get all handles.');
        console.log('quit: Quit the program.');
        console.log('help: List all functions with usages.');
      } else {
        console.log('help: List all functions with usages.');
      }
      break;
    default:
      break;
  }
  rl.prompt();
}).on('close', () => {
  process.exit(0);
});
