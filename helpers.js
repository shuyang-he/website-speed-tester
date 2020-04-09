

const sendData = (ws, data) => {
  res = Buffer.from(JSON.stringify(data));
  ws.send(res);
  console.log('server send: ', data);
}

exports.sendData = sendData;
