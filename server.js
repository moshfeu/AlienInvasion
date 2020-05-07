const handler = require('serve-handler');
const express = require('express');
const app = express();
const http = require('http').createServer((request, response) => handler(request, response));
const io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('event', message => {
    console.log('message', message);
    socket.broadcast.emit('event', message);
  });

  socket.on('log', console.log);
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`listening on http://${getIPAddress()}:${PORT}`);
});

function getIPAddress() {
  const interfaces = require('os').networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }

  return '0.0.0.0';
}