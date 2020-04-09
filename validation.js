

const handleNotFound = (ws) => {
  res = Buffer.from(JSON.stringify('Error: test handle cannot find.'));;
  ws.send(res);
  console.log('server send: Error: test handle cannot find.');
}

exports.handleNotFound = handleNotFound;
