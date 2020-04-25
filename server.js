const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('event', message => {
    socket.broadcast.emit('event', message);
  });

  socket.on('log', console.log);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});